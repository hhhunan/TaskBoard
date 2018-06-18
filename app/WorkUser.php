<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laratrust\Traits\LaratrustUserTrait;

class WorkUser extends Authenticatable
{
    protected  $table = "work_user";
    public $timestamps = false;

    public function user()
    {
        return $this->hasMany(
            User::class,
            "id",
            "user_id"
        );
    }

    public function task()
    {
        return $this->hasMany(
            Task::class,
            "id",
            "task_id"
        );
    }



    public function addtaskuser()
    {
        return $this->hasMany(
            UserWork::class,
            "work_id",
            "id"
        );
    }
}
