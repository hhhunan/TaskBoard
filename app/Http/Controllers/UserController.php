<?php

namespace App\Http\Controllers;

use App\Permission;
use App\Task;
use App\Team;
use App\User;
use App\Role;
use App\Project;
use App\UserWork;
use App\WorkUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;



class UserController extends Controller
{
    public function usersList(){

//        $user = Auth::user();
//        $permissions = $user->allPermissions();
        $id = Auth::id();
        $users = User::with("roles","team")->where("id","!=" , $id)->get();

        return $users;
    }

    public function getRoles(){


        $roles = Role::all();
        $teams = Team::all();
        $a = [$roles,$teams];
        return $a;

    }

    public function search(Request $request){

        $search_user = User::where("name","LIKE",$request->message)->first();
        $roles = Role::all();
        $tasks = Task::all();
        $projects = Project::all();
        $teams = Team::all();
        $permissions = Permission::all();

        $response = array(
            'status' => 'success',
            'msg' => $search_user,
            'roles' => $roles,
            'projects' => $projects,
            'tasks' => $tasks,
            'teams' => $teams,
            'permissions' => $permissions,
        );
        return response()->json($response);
    }

    public function addUser(Request $request){

        $user_data = $request->all();
        $user = User::where("name",$user_data["data"]["name"])->first();
        $role = Role::where("id",$user_data["data"]["role"])->first();

        if($user_data["data"]["team"] == "no_team"){
            $user->attachRole($role);
        }else{
            $team = Team::where("id",$user_data["data"]["team"])->first();
            $user->attachRole($role,$team);
        }

        return response()->json($user);
    }


    public function updateUser(Request $request,$id){

        if(isset( $request->all()['data']["role"])){

            $role_id = $request->all()['data']["role"];
            $team_id = $request->all()['data']["team"];
        }


        $validator = Validator::make($request->all()['data'], [
            'name' => "required|unique:users,name,$id",
            'first_name' => "required|unique:users,first_name,$id",
            'last_name' => "required|unique:users,last_name,$id",
            'email' => "required|unique:users,email,$id",
        ]);

        if ($validator->passes()) {

              $update_user = User::find($id);
              $update_user->name = $request->all()['data']["name"];
              $update_user->first_name = $request->all()['data']["first_name"];
              $update_user->last_name = $request->all()['data']["last_name"];
              $update_user->email = $request->all()['data']["email"];

              if($request->all()['data']["password"] != null){

                  $update_user->password = Hash::make($request->all()['data']["password"]);
              }

              if($update_user->save()){

                  if(isset($request->all()['data']["role"])){

                      DB::table('role_user')->where('user_id', $id)->delete();
                      if($team_id != "no_team"){

                          $update_user->syncRoles([$role_id], $team_id);
                      }else{

                          $update_user->syncRoles([$role_id]);
                      }
                  }


                  return response()->json(["message" => "User updated","status"=>"200"]);
              }else{

                  return response()->json(["message" => "Something went wrong","status"=>"400"]);
              }

        }

        return response()->json(["message" => $validator->errors()->all(),"status" => 500]);
    }

    public function deleteUser(Request $request, $id){




        $user_have_task = User::with(["task"=>function($q){
            $q->where("task_position","!=","Finish");
        }])->find($id);


        $user_give_task = UserWork::with(["task"=>function($q){

            $q->where("task_position","!=","Finish");
        }])->where("user_id",$id)->get();


//        $user_give_task = UserWork::where('user_id', $id)->first();

        if (count($user_have_task["task"]) > 0) {

            return response()->json('This user have a task');
        }elseif (count($user_give_task ) > 0){

            return response()->json('This user give a task');
        }else{


            $user = User::find($id);
            $user->status = $request["data"]["status"];
            if($user->save()){

                if($request["data"]["status"] == "1"){

                    return response()->json('User enabled');
                }else{

                    return response()->json('User desebled');
                }


            }else{

                return response()->json('Something went wrong');
            }

        }



    }

    public function getUser($id){

        $user = User::with("task", "roles","teamm")->find($id);

        return $user;
    }

    public function updateImg(Request $request,$id){


        $this->validate($request, [

            'file' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',

        ]);


        $image = $request->file('file');

        $input['imagename'] = time().'.'.$image->getClientOriginalExtension();

        $destinationPath = public_path('/image');

        $image->move($destinationPath, $input['imagename']);

        $user = User::find($id);
        $old_image_name = $user->img;
        $user->img = $input['imagename'];
        if($user->save()){
            if($old_image_name != "user.jpg"){
                File::delete('image/' . $old_image_name[0]);
            }

            return response("Image updated");
        }else{

            return response("Something went wrong");
        }



    }
}
