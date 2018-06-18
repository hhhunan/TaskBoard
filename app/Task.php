<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{


    protected $fillable = [
        'id',  'title', 'description', 'prioritet', 'task_position', 'tester_id','project_id','start','end'
    ];

    public function user()
    {
        return $this->belongsToMany(
            User::class,
            "work_user",
            "task_id",
            "user_id"
        );
    }

    public function work()
    {
        return $this->hasMany(
            UserWork::class,
            "work_id",
            "id"
        );
    }
    public function lop()
    {
        return $this->hasMany(
            User::class,
            "id",
            "tester_id"
        );
    }

    public function project()
    {
        return $this->hasMany(
            Project::class,
            "id",
            "project_id"
        );
    }


    public function users(){
        return $this->hasMany(
            User::class,
            "team_id",
            "id"
        );
    }




    public function userForSync()
    {
        return $this->belongsToMany(
            User::class,
            "work_user",
            "task_id",
            "user_id"
        );
    }



    public function tester()
    {
        return $this->hasOne(
            User::class,
            "id",
            "tester_id"
        );
    }







    public function getworkuser()
    {
        return $this->hasMany(
            WorkUser::class,
            "task_id",
            "id"
        );
    }


}
