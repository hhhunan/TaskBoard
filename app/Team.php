<?php

namespace App;

use Laratrust\Models\LaratrustTeam;
use App\User;

class Team extends LaratrustTeam
{
    public function team_user(){
        return $this->belongsToMany(
            User::class,
            "role_user",
            "team_id",
            "user_id"
        );
    }
}
