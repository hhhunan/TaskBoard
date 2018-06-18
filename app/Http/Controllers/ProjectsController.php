<?php

namespace App\Http\Controllers;

use App\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProjectsController extends Controller
{
    public function projectsList(){


        $projects = Project::all();
        return response()->json($projects);

    }

    public function addProject(Request $request){

        $validator = Validator::make($request->all()['data'], [
            'title' => 'required|unique:projects',
            'description' => 'required',
        ]);

        if ($validator->passes()) {

            $set_project = new Project();
            $set_project->title = $request->all()["data"]["title"];
            $set_project->description = $request->all()["data"]["description"];

            if($set_project->save()){
                return response()->json('Added new project');
            }else{
                return response()->json('Error! try again');
            }

        }

        return response()->json($validator->errors()->all());

    }

    public function delete(Request $request){

        $id = (int)$request->all()["data"]["id"];

       if(Project::find($id)->delete()){
           return response()->json('Project deleted');
       }else{
           return response()->json('Something went wrong');
       }

    }

    public function updateValues(Request $request){

        $id = $request->all()["data"]["id"];
        $project = Project::where("id",$id)->first();
        return response()->json($project);

    }

    public function update(Request $request){

        $id =  $request->all()['data']['id'];
        $validator = Validator::make($request->all()['data'], [
            'title' => "required|unique:projects,title,$id",
            'description' => 'required',
        ]);

        if ($validator->passes()) {


            if(Project::whereId($request->all()['data']["id"])->update($request->all()['data'])){
                return response()->json('Project updaed');
            }else{
                return response()->json('Something went wrong');
            }

        }

        return response()->json($validator->errors()->all());

    }
}
