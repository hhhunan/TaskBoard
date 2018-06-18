<?php

namespace App\Http\Controllers;

use App\Team;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class TeamController extends Controller
{
    public function teamList(){

        $team_list = Team::all();
        return $team_list;
    }

    public function addTeam(Request $request){


        $validator = Validator::make($request->all()['data'], [
            'name' => 'required|unique:teams',
            'description' => 'required',
        ]);


        if ($validator->passes()) {

            $set_project = new Team();
            $set_project->name = $request->all()["data"]["name"];
            $set_project->description = $request->all()["data"]["description"];

            if($set_project->save()){

                return response()->json(["message" => 'New team is added',"status" => 200]);
            }else{

                return response()->json(["message" => 'Error! try again',"status" => 400]);
            }

        }

        return response()->json(["message" => $validator->errors()->all(),"status" => 500]);
    }

    public function getTeam($id){

        $team = Team::with("team_user")->where("id", $id)->get();
        return $team;
    }

    public function updateTeam(Request $request,$id){

        $validator = Validator::make($request->all()['data'], [
            'name' => "required|unique:teams,name,$id",
            'description' => 'required',
        ]);

        if ($validator->passes()) {

            if(Team::whereId($id)->update($request->all()['data'])){
                return response()->json(["message" => 'Team updaed', "status" => 200]);
            }else{
                return response()->json(["message" => 'Something went wrong',"status" => 400]);
            }
        }

        return response()->json(["message" => $validator->errors()->all(),"status" => 500]);
    }

    public function deleteTeam($id){

        $team =  Team::find($id);
        DB::table('role_user')
            ->where('team_id', $id)
            ->update(['team_id' => null]);

        if($team->delete()){

            return response()->json('Team deleted');
        }else{

            return response()->json('Something went wrong');
        }
    }
}
