<?php

namespace App\Http\Controllers;

use App\Project;
use App\Task;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Queue\Console\WorkCommand;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;
use App\UserWork;
use App\WorkUser;
use Illuminate\Support\Facades\Validator;
use phpDocumentor\Reflection\Types\Null_;

class TaskController extends Controller
{
    public function index()
    {

        $userr = Auth::user();
        $auth_user = Auth::user()->roles()->get();

        $user =  [];
        $tasks_list = [];

        if ($auth_user[0]["name"] == "Task manager") {

            $tasks_list = UserWork::with(['user','works' => function ($query) {
                $query->with("user", "task");
            }])->where('user_id', $userr->id)->get();

        }else{

            $tasks_list = UserWork::with(['user', 'tasks' => function ($q) {
                $q->with('user', 'task');
            }])->get();


//            stex
//            $tasks_list = Task::with(["getworkuser" => function($q)use ($userr){
//
//                $q->with(["user","addtaskuser"=>function($qu)use ($userr){
//                    $qu->with("user");
//                }]);
//            }])->get();
//
//           stext

        }

//        $tasks_list = UserWork::with(['user', 'tasks' => function ($q) {
//            $q->with('user', 'task');
//        }])->get();



        //$auth_user = Auth::user()->roles()->get();

//        $tasks_list["auth_user"] = $auth_user;

//        $tasks_list =  UserWork::with(['user'])->get();

        return [$tasks_list, $auth_user];
    }

    public function getTaskForUser(Request $request)
    {

        $id = WorkUser::where("task_id", $request->all()["data"])->pluck('id')->first();

        $tasks_list = UserWork::where("work_id", $id)->with(['user', 'tasks' => function ($q) {
            $q->with(['user', 'task' => function ($query) {
                $query->with('lop', "project");
            }]);
        }])->get();

        $users = User::all();
        $projects = Project::all();
        $auth_user = Auth::user();
        $auth_user_role = $auth_user->roles;
        $tasks_list["users_list"] = $users;
        $tasks_list["projects_list"] = $projects;
        $tasks_list["auth_user"] = $auth_user;
        $tasks_list["auth_user_role"] = $auth_user_role;

        return $tasks_list;
    }

    public function edit(Request $request, $id)
    {

        $validator = Validator::make($request->all()['data'], [
            'user_id' => 'required',
            'added' => 'required',
            'title' => 'required',
            'description' => 'required',
            'tester_id' => 'required',
            'project_id' => 'required',
            'finish_date' => 'required',
            'priority' => 'required',
//            'process' => 'required',
            'point' => 'required|min:2',

        ]);
        if ($validator->passes()) {

            $task = Task::find($id);
            $req = $request->all();
            $user_id = $req['data']['user_id'];
            $added = Auth::id();
            $title = $req['data']['title'];
            $description = $req['data']['description'];
            $tester_id = $req['data']['tester_id'];
            $project_id = $req['data']['project_id'];
            $finish_date = $req['data']['finish_date'];
            $priority = $req['data']['priority'];
//            $process = $req['data']['process'];
            $point = $req['data']['point'];
            $task->update(['title' => $title, 'description' => $description, 'prioritet' => $priority,  'tester_id' => $tester_id, 'project_id' => $project_id, 'end' => $finish_date, 'task_point' => $point]);
            $work_user = $task->userForSync()->sync([$user_id]);
            $work_id = WorkUser::where('task_id', $id)->first()->id;

            UserWork::where('user_id', $added)->where('work_id', $work_id)->update(['work_id' =>  $work_id ]);

            return response()->json('Edit Task');

        } else {
            return response()->json($validator->errors()->all());

        }
    }

    public function create(Request $request)
    {


        $validator = Validator::make($request->all()['data'], [

            'user_id' => 'required',
            'title' => 'required',
            'description' => 'required',
            'tester_id' => 'required',
            'project_id' => 'required',
            'start_date' => 'required',
            'finish_date' => 'required',
            'priority' => 'required',
//            'process' => 'required',
            'point' => 'required',

        ]);

        if ($validator->passes()) {
            $req = $request->all();

            $title = $req['data']['title'];
            $description = $req['data']['description'];
            $priority = $req['data']['priority'];
//            $process = $req['data']['process'];
            $tester_id = $req['data']['tester_id'];
            $project_id = $req['data']['project_id'];
            $start_date = $req['data']['start_date'];
            $finish_date = $req['data']['finish_date'];
            $point = $req['data']['point'];
            $user_id = $req['data']['user_id'];
            $added = Auth::id();

            $task = new Task();
            $task->title = $title;
            $task->description = $description;
            $task->prioritet = $priority;
            $task->tester_id = $tester_id;
            $task->project_id = $project_id;
//            $task->task_position = $process;
            $task->start = $start_date;
            $task->end = $finish_date;
            $task->task_point = $point;

            if ($task->save()) {
                $task_id = $task->id;
                $workUser = new WorkUser();
                $workUser->user_id = $user_id;
                $workUser->task_id = $task_id;
                if ($workUser->save()) {
                    $work_id = $workUser->id;
                    $userWork = new  UserWork();
                    $userWork->work_id = $work_id;
                    $userWork->user_id = $added;
                    $userWork->save();
                }
            }
            return response()->json('Create Task');

        } else {

            return response()->json($validator->errors()->all());
        }
    }

    public function delete($id)
    {

        if (Task::find($id)->delete()) {

            $dl_id = WorkUser::where("task_id",$id)->pluck("id")->first();


            if(WorkUser::where("task_id",$id)->delete()){

//                if(UserWork::where("work_id",$dl_id)->delete()){
//
//                    return response()->json('Task deleted');
//                }else{
//
//                    return response()->json('Something went wrong');
//                }

            }else{

                return response()->json('Something went wrong');
            }


                return response()->json('Task deleted');
        } else {

            return response()->json('Something went wrong');
        }

    }

    public function getBoard()
    {

        $user = Auth::user();

        if ($user->roles[0]["name"] == "User" || $user->roles[0]["name"] == "Tester") {

            $auth = User::with("task", "roles","teamm")->with(["team" => function ($query) use ($user) {
                $query->with(['users' => function ($q) use ($user) {
                    $q->where("id", "!=", $user->id)->with("task");
                }]);
            }])->find($user->id);

//            $auth = User::with("task","roles")->find($user->id);
            $auth["tasks_for_test"] = Task::where('tester_id', $user->id)->with(["getworkuser"=>function($q){
                $q->with("user");
            }])->get();

        } else if ($user->roles[0]["name"] == "Task manager") {

            $auth = User::with("task", "roles","teamm")->find($user->id);

            $auth["manager"] = UserWork::with(['works' => function ($query) {
                $query->with( ["user","task"=>function($q){

                    $q->with('tester');
                }]);
            }])->where('user_id', $user->id)->get();

//                User::with(["other" => function($query)use($user){
////                $query->where('id',$user->id);
//            }])->get();


        } else {

/*
            $tsk = Task::with(["user"=>function($q)use ($user){
                $q->where('user_id', "!=", $user->id);
            }])->whereHas("user",function($q)use ($user){
                $q->where('user_id', "!=", $user->id);
            })->get();
*/


            $auth = User::with("task", "roles","teamm")->find($user->id);
            $auth["other_users"] = User::with("task")->where('id', "!=", $user->id)->get();



            //$auth["other_users"] = Task::with("user")->where('id', "!=", $user->id)->get();
            //$auth["other_users"] = $tsk;

//            return $auth;
        }

        return [$auth];
    }

    public function taskMoveUpdate(Request $request, $id)
    {


        $task = Task::findOrFail($id);

        if (array_key_exists("change_tester", $request->all()["data"])) {

            $task->tester_id = $request->all()["data"]["change_tester"];
        }

        if (array_key_exists("task_position_for_tester", $request->all()["data"]) && ($request->all()["data"]["task_position"] != "Discussion" && $request->all()["data"]["task_position"] != "Finish")) {
            // $task->tester_id = $request->all()["data"]["tester_id"];
            if($request->all()["data"]["task_position_for_tester"] == "Tasks" || $request->all()["data"]["task_position_for_tester"] == "In_Process"){

                $task->task_position = $request->all()["data"]["task_position"];
                $task->task_position_for_tester = $request->all()["data"]["task_position_for_tester"];
            }else{

                $task->task_position_for_tester = $request->all()["data"]["task_position"];
            }


//            if (array_key_exists("task_position", $request->all()["data"])) {
//                $task->task_position = $request->all()["data"]["task_position"];
//            }


            $task->save();
        }

        else{

            if (array_key_exists("task_move_test", $request->all()["data"])) {

                // $task->tester_id = $request->all()["data"]["tester_id"];
                $task->task_position_for_tester = "Tasks";

            }

//            if (array_key_exists("tester_id", $request->all()["data"])) {
//
//                $task->tester_id = $request->all()["data"]["tester_id"];
//                $task->task_position = $request->all()["data"]["task_position"];
//                $task->task_position_for_tester = $request->all()["data"]["task_position"];
//                $task->save();
//            }


//            else {


                $task->task_position = $request->all()["data"]["task_position"];
                if($request->all()["data"]["task_position"] == "Finish" || $request->all()["data"]["task_position"] == "Discussion"){

                    $task->task_position_for_tester = $request->all()["data"]["task_position"];
                }

                $task->closed = $request->all()["data"]["end_task"];
                $task->save();
                $task_point = $task->task_point;




                $work_user = WorkUser::with("user")->where("task_id", $task->id)->first();

                if ($request->all()["data"]["end_task"] == 1) {

                    $work_user["user"][0]->point = $work_user["user"][0]->point + $task_point;
                }


                if (array_key_exists("user_id", $request->all()["data"])) {

                    $work_user->user_id = $request->all()["data"]["user_id"];
                }


                $work_user->push();
            }
//        }





//            $work_user->save();
//        }else{
//
//            $task = Task::findOrFail($id);
//            $task->task_position = $request->all()["data"]["task_position"];
//            $task->save();
//
//        }
    }

    public function setMessage(Request $request, $id)
    {

        $task = Task::find($id);
        $task->message = $request->all()["data"]["task_message"];

        if (array_key_exists("finish", $request->all()["data"])) {

            $task->see_message = "0";
            $task->see_message_meneger = "0";
        }else{

            $task->see_message = "1";
            $task->see_message_meneger = "1";
        }


        if ($task->save()) {

            return response()->json('Succies');
        } else {

            return response()->json('Something went wrong');
        }

    }

    public function deleteTaskMsg(Request $request, $id)
    {

        $task = Task::find($id);
        if ($request["data"] == "for_user") {

            $task->see_message = "0";
        } else {

            $task->see_message_meneger = "0";
        }

        if ($task->save()) {

            return response()->json('Succies');
        }
    }
}
