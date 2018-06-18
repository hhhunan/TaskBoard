<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('auth.login');
});

Auth::routes();

//Route::prefix("manage")->group(function (){
//    Route::get("/dashboard","LaratrustController@lolo")->name("manage.dashboard");
//});

Route::get('/home', 'HomeController@index')->name('home');


//Route::group(['prefix' => 'admin', 'middleware' => ['role:admin']], function() {
//    Route::get('/', 'AdminController@welcome');
//    Route::get('/manage', ['middleware' => ['permission:manage-admins'], 'uses' => 'AdminController@manageAdmins']);
//});

Route::get('adduser', function(){ return view('home'); });
Route::post('/adduser','UserController@usersList');

Route::get('postajax', function(){ return view('home'); });
Route::post('/postajax','UserController@search');

Route::get('addnewuser', function(){ return view('home'); });
Route::post('/addnewuser','UserController@addUser');

Route::get('projects', function(){ return view('home'); });
Route::post('/projects','ProjectsController@projectsList');

Route::get('addproject', function(){ return view('home'); });
Route::post('/addproject','ProjectsController@addProject');

Route::post('/deleteproject','ProjectsController@delete');

Route::post('/updateproject','ProjectsController@updateValues');

Route::post('/doupdateproject','ProjectsController@update');

Route::post('/tasks','TaskController@index');

Route::post('/gettaskforuser','TaskController@getTaskForUser');

Route::post('/updateTask','TaskController@edit');

Route::post('/deleteTask/{id}','TaskController@delete');

Route::post('/getroles','UserController@getRoles');

Route::post('/updateuser/{id}','UserController@updateUser');

Route::post('/teamlist','TeamController@teamList');

Route::post('/addteam','TeamController@addTeam');

Route::post('/updateteam/{id}','TeamController@getTeam');

Route::post('/doupdateteam/{id}','TeamController@updateTeam');

Route::post('/deleteuser/{id}','UserController@deleteUser');

Route::post('/deleteteam/{id}','TeamController@deleteTeam');

Route::post('/getboard','TaskController@getBoard');

Route::post('/taskmoveupdate/{id}','TaskController@taskMoveUpdate');

//Route::get('/projects',['uses'=>'ProjectsUserController@index','as'=>'projects']);
Route::post('/updateTask/{id}','TaskController@edit');

Route::post('/createTask','TaskController@create');

Route::post('/settaskmessage/{id}','TaskController@setMessage');

Route::post('/deletetaskmsganswer/{id}','TaskController@deleteTaskMsg');


Route::post('/getuser/{id}','UserController@getUser');

Route::post('/updateimg/{id}','UserController@updateImg');

