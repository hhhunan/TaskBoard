<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laratrust\Traits\LaratrustUserTrait;

class UserWork extends Authenticatable
{
    protected  $table = "user_work";

    public $timestamps = false;

    public function user()
    {
        return $this->hasMany(
            User::class,
            "id",
            "user_id"
        );
    }

    public function works()
    {
        return $this->hasMany(
            WorkUser::class,
            "id",
            "work_id"
        );
    }


    public function tasks()
    {
        return $this->hasMany(
            WorkUser::class,
            "id",
            "work_id"
        );
    }


    public function workss()
    {
        return $this->hasMany(
            WorkUser::class,
            "user_id",
            "work_id"
        );
    }


    public function task(){
        return $this->belongsToMany(
            Task::class,
            "work_user",
            "user_id",
            "task_id"
        );
    }

}
