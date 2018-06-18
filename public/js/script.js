$(document).ready(function () {

    window.location.hash="no-back-button";
    window.location.hash="Again-no-back-button";//for google chrome
    window.onhashchange=function(){window.location.hash="no-back-button";}

    function readURL(input) {

        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#image').attr('src', e.target.result);
            };

            reader.readAsDataURL(input.files[0]);
        }
    }

    function endDatePicer() {
        $("body").find("#createDate, #dataEnd").datetimepicker({

            format: "y-m-d h:i"
        });
    }


    function userLogout() {
        $(".user_logout").click(function () {
            localStorage.setItem("page", 0);
        });

        $(".login_board").click(function () {

            localStorage.setItem("page", 0);
        });
    }

    userLogout();



    function userPg(user) {
        var user = sendAjax("","/getuser/" + user);
        console.log(user.roles[0].name)
        var users_list_html = '';

        users_list_html += '<div  class="modal fade" id="userpg' + user.id + '" role="dialog">';
        users_list_html += '<div class="modal-dialog  modal-dialog-centered modal-lg">';
        users_list_html += '<div class="modal-content">';

        users_list_html += '<div class="modal-header btn-primary rounded-top">';

        users_list_html += '<button user_id="' + user.id + '"  class="btn btn-success update_user btn-sm"><i class="fas fa-edit"></i></button>';
        //  users_list_html += '<button user_id="' + user.id + '" data-original-title="Remove this user" class="btn btn-sm btn-danger pull-right delete_user"><i class="far fa-trash-alt"></i></button>';
        users_list_html += '</div>';

        users_list_html += '<div class="modal-body">';
        users_list_html += '<table class="table table-user-information">';
        users_list_html += '<tbody>';
        users_list_html += '<tr>';
        users_list_html += '<td>Name</td>';
        users_list_html += '<td class="update_user_date">' + user.name + '</td>';
        users_list_html += '</tr>';
        users_list_html += '<tr>';
        users_list_html += '<td>First Name</td>';
        users_list_html += '<td class="update_user_date">' + user.first_name + '</td>';
        users_list_html += '</tr>';
        users_list_html += '<tr>';
        users_list_html += '<td>Last Name</td>';
        users_list_html += '<td class="update_user_date">' + user.last_name + '</td>';
        users_list_html += '</tr>';
        users_list_html += '<tr>';
        users_list_html += '<td>Email</td>';
        users_list_html += '<td class="update_user_date">' + user.email + '</td>';
        users_list_html += '</tr>';
        users_list_html += '<tr>';
        users_list_html += '<td>Password</td>';
        users_list_html += '<td class="update_user_date"></td>';
        users_list_html += '</tr>';

        if(user.roles[0].name == 'Admin'){

            users_list_html += '<tr>';
            users_list_html += '<td class="user_role">Role</td>';
            users_list_html += '<td class="update_user_date">' + user["roles"][0].name + '</td>';
            users_list_html += '</tr>';
            users_list_html += '<tr>';
            users_list_html += '<td class="user_role">Team</td>';
            users_list_html += '<td class="update_user_date">' + (user.teamm.length != 0 ? user.teamm[0].name : 'No team') + '</td>';
            users_list_html += '</tr>';

        }



        users_list_html += '<tr>';
        users_list_html += '<td class="user_role">User Point</td>';
        users_list_html += '<td class="update_user_point">' + user.point + '</td>';
        users_list_html += '</tr>';


        users_list_html += '<tr>';
        users_list_html += '<td class="user_image">User Image</td>';
        users_list_html += '<td class="update_user_img update_user_date"><img src="/image/' + user.img + '" width="250px" height="200px" class="user_img_for_update"></td>';
        users_list_html += '</tr>';


        users_list_html += '</tbody>';
        users_list_html += '</table>';
        users_list_html += '</div>';

        users_list_html += '<div class="modal-footer">';
        users_list_html += '<button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>';
        users_list_html += '</div>';

        users_list_html += '</div>';
        users_list_html += '</div>';
        users_list_html += '</div>';


        $(".user_pg").empty().append( users_list_html);
        updateUser("user_pg");
    }



    function sveTaskMessage(task_id) {

        $(".save_task_message").click(function () {

            var task_message, task_message_error = true, task_message_error_message, set_task_message_answer;
            task_message = $("#task_message").val();

            if (task_message == "") {

                task_message_error_message = "Please set message for this task";
            } else {

                task_message_error = false;
            }

            if (task_message_error) {

                $(".task_message_error").text(task_message_error_message);
            } else {

                var data = {"task_message": task_message};
                set_task_message_answer = sendAjax(data, "/settaskmessage/" + task_id);

                if ("Succies" == set_task_message_answer) {

                    return true;
                } else {

                    alert(set_task_message_answer)
                }

            }
        });
    }

    function setBoardCols(other_users, array_for_users_id) {


        var board_html = '';
        var other_users_count = other_users.length;
        if (other_users_count > 0) {

            for (var j = 0; j < other_users_count; j++) {

                var other_user_tasks_count;
                // other_user_tasks_count = other_users[j].task.length;

                // if (other_user_tasks_count > 0) {
                // for(var o = 0; o < other_users_count; o ++){


                board_html += '<div id="' + other_users[j].id + '"  class="panel panel-default board-section">';
                // style="margin-top: -12px;position: absolute;z-index: 1"
                board_html += '<div  class="panel-heading">';
                board_html += '<div class="col-md-12">';
                board_html += '<h4 class="panel-title"><a   data-toggle="collapse" data-parent="#accordion" href="#collapseOne' + other_users[j].id + '"></a>';
                board_html += '<span class="collapse_user_name" id="collapse' + other_users[j].id + '">' + other_users[j].name + '</span>';
                board_html += '</div>';
                board_html += '</h4>';
                board_html += '</div>';


                board_html += ' <div id="collapseOne' + other_users[j].id + '" class="panel-collapse collapse show">'; //inqn e
                board_html += ' <div  class="panel-body ">'; //inqn e
                board_html += ' <div class="row justify-content-md-center border_row">';


                board_html += '<div class="col-md-2">';

                board_html += '<div class="board image_user" id="image_user">';
                board_html += '<div class="col-md-12 text-center">';
                board_html += '<img src="/image/' + other_users[j].img + '" >';
                board_html += '<h5>' + other_users[j].name + '</h5>';
                board_html += '</div>';
                board_html += '</div>';
                board_html += '</div>';

                board_html += '<div class="col-md-2">';

                board_html += '<div class="board lolo" id="Tasks">';
                board_html += '</div>';
                board_html += '</div>';


                board_html += '<div class="col-md-2 ">';

                board_html += '<div class="board lolo" id="In_Process">';
                board_html += '</div>';
                board_html += '</div>';


                board_html += '<div class="col-md-2">';

                board_html += '<div class="board lolo" id="Test">';
                board_html += '</div>';
                board_html += '</div>';


                board_html += '<div class="col-md-2 ">';

                board_html += '<div class="board lolo" id="Discussion">';
                board_html += '</div>';
                board_html += '</div>';


                board_html += '<div class="col-md-2 ">';

                board_html += '<div class="board lolo" id="Finish">';
                board_html += ' </div>';
                board_html += ' </div>';

                board_html += ' </div>';
                board_html += ' </div>';

                board_html += '</div>'; //inqn e
                board_html += '</div>'; //inqn e

                // board_html += '</div>'; //inqn e
                // board_html += '</div>'; //inqn e
                // }

                // }

                array_for_users_id.push(other_users[j].id);

            }

            return board_html;
        }
    }

    function userName() {
        $(".panel-title >a").on('click',function () {
            console.log($(this).hasClass("collapsed"));
            if($(this).hasClass("collapsed")){
                $( this ).next().css("visibility","hidden");

            }else{
                $( this ).next().css("visibility","visible");

            }


        });
    }


    function setTasks(users) {



        if (users.length > 0) {

            for (var o = 0; o < users.length; o++) {

                var auth_user_tasks_length;
                auth_user_tasks_length = users[o].task.length;

                if (auth_user_tasks_length > 0) {

                    for (var i = 0; i < auth_user_tasks_length; i++) {
                        var prioritet_color;

                        if (users[o].task[i].prioritet == "No prioritet") {

                            prioritet_color = "Blue";
                        } else if (users[o].task[i].prioritet == "Unimportant") {

                            prioritet_color = "#f0ad4e";
                        } else if (users[o].task[i].prioritet == "Middle") {

                            prioritet_color = "Green";
                        } else if (users[o].task[i].prioritet == "Critical") {

                            prioritet_color = "red";
                        }
                        if(users[o].task[i].getworkuser != undefined){

                            var user_id = users[o].task[i].getworkuser[0].user[0].id
                        }else{
                            var user_id = users[o].id;
                        }
                        // if(board_answer.task[i].task_position == "Tasks"){






                        var board_html = '<div tester_id="' + users[o].task[i].tester_id + '" user_id="' + user_id + '" task_id="' + users[o].task[i].id + '" id="item' + users[o].task[i].id + '" class="col-md-11 items" draggable="true" style="padding-top: 5px; border-left: 5px solid ' + prioritet_color + ';">';
                        board_html += ' <div class="row task">';
                        board_html += ' <div class="col-md-6 text-left">';
                        board_html += ' <h6>' + users[o].task[i].title.substr(0, 10) + '</h6>';
                        board_html += '</div>';
                        board_html += '<div class="col-md-6 text-right">';
                        board_html += '<div class="btn-group ">';
                        board_html += '<button type="button" class="btn btn-warning btn-sm dropdown-toggle dropdown-toggle-split" data-toggle="dropdown"></button>';
                        board_html += '<div class="dropdown-menu crud_task text-center">';
                        board_html += '<div class="col-md-12">';
                        board_html += ' <i   task_id="' + users[o].task[i].id + '" class="fas fa-eye task_show" data-toggle="modal" data-target="#viewModal"></i>';
                        board_html += '</div>';
                        board_html += '</div>';
                        board_html += '</div>';
                        board_html += '</div>';
                        // board_html += '<div class="col-md-12 task_description">';
                        // board_html += '<p>' + users[o].task[i].description.substr(0, 15) + '</p>';
                        // board_html += '</div>';
                        board_html += '</div>';
                        board_html += '</div>';
                        // }



                        if (users[o].task[i].task_position == "Tasks") {

                            if($("#" + users[o].id).find("#Tasks").find("#item"+users[o].task[i].id).length == 0){
                                $("#" + users[o].id).find("#Tasks").append(board_html);
                            }


                        } else if (users[o].task[i].task_position == "In_Process") {


                            if($("#" + users[o].id).find("#In_Process").find("#item"+users[o].task[i].id).length == 0){
                                $("#" + users[o].id).find("#In_Process").append(board_html);
                            }


                            // $("#" + users[o].id).find("#In_Process").append(board_html);
                        } else if (users[o].task[i].task_position == "Test") {

                            if(users[o].task[i].task_position_for_tester != null && $("#" + users[o].task[i].tester_id).find("#"+users[o].task[i].task_position_for_tester).find("#item"+users[o].task[i].id+"task_for_test").length == 0){
                                var t_id = "item" + users[o].task[i].id + "task_for_test";
                                $("#" + users[o].task[i].tester_id).find("#"+users[o].task[i].task_position_for_tester).append(board_html);
                                $("#" + users[o].task[i].tester_id).find("#item" + users[o].task[i].id).append("<p class='task_for_test'></p>").addClass("cloneTask").attr("id",t_id);
                            }


                            if($("#"+users[o].id).find($("#item" + users[o].task[i].id)).length < 1){
                                $("#" + users[o].id).find("#Test").append(board_html);
                            }

                            // if( $("#item"+users[o].task[i].id).length > 0 ){
                            //     var t_id = "item" + users[o].task[i].id + "task_for_test";
                            //     $("#"+users[o].task[i].tester_id).find("#item"+users[o].task[i].id).attr("id",t_id);
                            // }


                            // $("#" + users[o].task[i].tester_id).find("#item" + users[o].task[i].id).find(".task_description").append("<p class='task_for_test'>Task for test</p>");
                        } else if (users[o].task[i].task_position == "Discussion") {

                            //$("#" + users[o].id).find("#Discussion").append(board_html);



                            if($("#" + users[o].task[i].tester_id).find("#Discussion").find("#item"+users[o].task[i].id+"task_for_test").length == 0){
                                var t_id = "item" + users[o].task[i].id + "task_for_test";
                                $("#" + users[o].task[i].tester_id).find("#Discussion").append(board_html);
                                $("#" + users[o].task[i].tester_id).find("#item" + users[o].task[i].id).append("<p class='task_for_test'></p>").addClass("cloneTask").attr("id",t_id);
                            }





                            if($("#"+users[o].id).find($("#item" + users[o].task[i].id)).length < 1){
                                $("#" + users[o].id).find("#Discussion").append(board_html);
                            }



                            // if( $("#item"+users[o].task[i].id).length > 0 ){
                            //     var t_id = "item" + users[o].task[i].id + "task_for_test";
                            //     $("#"+users[o].task[i].tester_id).find("#item"+users[o].task[i].id).attr("id",t_id);
                            // }


                        } else if (users[o].task[i].task_position == "Finish") {

                            // if( $("#item"+users[o].task[i].tester_id).length > 0 ){
                            //     var t_id = "item" + users[o].task[i].id + "task_for_test";
                            //     $("#"+users[o].task[i].tester_id).find("#item"+users[o].task[i].id).attr("id",t_id);
                            // }


                            if($("#" + users[o].task[i].tester_id).find("#Finish").find("#item"+users[o].task[i].id+"task_for_test").length == 0){
                                var t_id = "item" + users[o].task[i].id + "task_for_test";
                                $("#" + users[o].task[i].tester_id).find("#Finish").append(board_html);
                                $("#" + users[o].task[i].tester_id).find("#item" + users[o].task[i].id).append("<p class='task_for_test'></p>").addClass("cloneTask").attr("id",t_id);;;
                            }




                            // if( $("#item"+users[o].task[i].id).length > 0 ) {
                            //     $("#" + users[o].id).find("#Finish").append(board_html);
                            // }


                            if($("#"+users[o].id).find($("#item" + users[o].task[i].id)).length < 1){
                                $("#" + users[o].id).find("#Finish").append(board_html);
                            }


                            // if( $("#item"+users[o].task[i].id).length > 0 ){
                            //     var t_id = "item" + users[o].task[i].id + "task_for_test";
                            //     $("#"+users[o].task[i].tester_id).find("#item"+users[o].task[i].id).attr("id",t_id);
                            // }
                        }
                    }
                }
            }
        }
    }




    $(function () {
        $('#datetimepicker1').datetimepicker({
            locale: 'ru'
        });
    });


    function deleteTeam() {

        $(".delete_teamt").off("click");
        $(".delete_teamt").click(function () {
alert(45454)
            var team_id, delete_team_answer;
            team_id = $(this).attr("id");
            delete_team_answer = sendAjax("", "/deleteteam/" + team_id);
            if (delete_team_answer == "Team deleted") {

                $(this).parents("tr").remove();
            } else {

                $(".error_msg").text(delete_team_answer);
            }
        });
    }

    function deleteUser() {

        $(".delete_user").click(function () {

            var user_id = $(this).attr("user_id");

            var i = $(this).find("i");

            var data = {};
            if($(this).find("i").hasClass("fa-lock-open")){

                data.status = "1";
            }else{

                data.status = "0";
            }

            var delete_user_answer = sendAjax(data, "/deleteuser/" + user_id);

            if (delete_user_answer == "User enabled") {

                // $(".modal-backdrop").css('position', "relative");
                i.attr("class","fas fa-lock");
                // userList();
            } else if(delete_user_answer == "User desebled"){

                i.attr("class","fas fa-lock-open");
            }else{

                $(".user_update_message").text(delete_user_answer).css("color","red");
            }

            closeUpdateUser();
        });
    }

    function closeTeamModal() {

        $(".close_team_modal").click(function () {

            $(".error_msg").text("");
            $(".modal-backdrop").css('position', "relative");
            $("body").removeClass("modal-oprn");
            teamListTable();
            updateTeam();
            deleteTeam();
        });
    }

    function teamValidation(event, id) {

        $(".save_team").click(function () {
            $(this).off("click");
            var team_name, team_description, error = false, error_message;

            team_name = $(".team_name").val();
            team_description = $(".team_description").val();

            if (team_name == "") {

                error = true;
                error_message = 'Name is required';
            } else if (team_description == "") {

                error = true;
                error_message = 'Description is required';
            }

            if (error) {

                $(".error_msg").css({"display": "block", "color": "red"}).text(error_message);
            } else {

                $(".error_msg").text("");
                var data = {"name": team_name, "description": team_description};
                if (event == "create") {
                    var path = "/addteam";
                } else {
                    // data.id = id;
                    var path = "/doupdateteam/" + id;
                }

                var ajax_answer = sendAjax(data, path);
                if (ajax_answer.status == 200) {

                    // $(".team_name").val("");
                    // $(".team_description").val("");
                }
                $(".error_msg").text(ajax_answer.message).css("color", (ajax_answer.status == 200 ? 'green' : 'red'));

            }
            teamValidation(event, id);
            closeTeamModal();
        });
    }


    function saveTeam() {

        teamValidation("create");
    }

    function updateTeam() {

        $(".update_team").click(function () {
            var team_id = $(this).attr("id");
            $(".modal-body").empty().append(newTeam("update", team_id));
            teamValidation("update", team_id);
            closeTeamModal();


        });
    }

    function newTeam(event, id) {

        var team_name_value, team_description_value;
        if (event == "create") {
            team_name_value = "";
            team_description_value = "";
        } else if (event == "update") {

            var ajax_answer = sendAjax("", "/updateteam/" + id);
            team_name_value = ajax_answer[0].name;
            team_description_value = ajax_answer[0].description;
        }
        var new_team = "";
        new_team += '<div class="card-body">';
        new_team += '<form>';
        new_team += '<div class="row">';

        new_team += '<div class="col-md-12">';
        new_team += '<div class="form-group">';
        new_team += '<label for="team_name">Team Name</label>';
        new_team += '<input class="form-control team_name" id="team_name" type="text" name="title" value="' + team_name_value + '">';
        new_team += '</div>';
        new_team += '</div>';


        new_team += '<div class="col-md-12">';
        new_team += '<div class="form-group">';
        new_team += '<label for="team_description">Team description</label>';
        new_team += '<textarea style="height: auto!important; resize: none;" class="form-control team_description" rows="4" id="team_description" type="text" name="description">';
        new_team += team_description_value;
        new_team += '</textarea>';
        new_team += '</div>';
        new_team += '</div>';

        new_team += '<div class="col-md-8">';
        new_team += '<div class="form-group">';
        new_team += '<button id="save_team" type="button" class="btn btn-info save_team">Save</button>';
        new_team += '</div>';
        new_team += '</div>';

        new_team += '</div>';
        new_team += '</form>';
        new_team += '</div>';

        return new_team;
    }

    function newTeamModal() {

        var new_team_modal = '';
        new_team_modal += '<div  class="modal  add_user_modal" id="new_team_modal"  role="dialog">';
        new_team_modal += '<div class="modal-dialog modal-lg">';
        new_team_modal += '<div class="modal-content">';
        new_team_modal += '<div class="modal-header btn-primary rounded-top "> <h4 class="modal-title" id="upload-avatar-title">Add Team</h4></div>';
        new_team_modal += '<div class="modal-body">';

        new_team_modal += '</div>';

        new_team_modal += '<div class="modal-footer">';
        new_team_modal += '<div class="error_msg col-md-6 col-sm-6 " ></div>';
        new_team_modal += '<div class="col-md-6 col-sm-6 text-right">';
        new_team_modal += '<button class="btn btn-secondary close_team_modal" data-dismiss="modal" aria-hidden="true">Close</button>';
        new_team_modal += '</div>';
        new_team_modal += '</div>';
        new_team_modal += '</div>';
        new_team_modal += '</div>';
        new_team_modal += '</div>';

        new_team_modal += '<div class="for_create_user_modal"></div>';
        $(".for_modal").empty().append(new_team_modal);
        $(".modal-body").empty().append(newTeam("create", ""));
        saveTeam();
        projectValidation();
    }


    function teamListTable() {

        var team_list, team_count;
        team_list = sendAjax("", "/teamlist");
        team_count = team_list.length;

        var team_list_table_html = '';
        team_list_table_html += '<div class="container-fluid">';

        team_list_table_html += '<div class="row tasks_row">';
        team_list_table_html += '<div class="col-md-8">';

        team_list_table_html += '<h2>Teams</h2>';
        team_list_table_html += '</div>';
        team_list_table_html += '<div class="col-md-4 text-center">';

        team_list_table_html += '<button class="btn btn-primary add_new_team"  data-toggle="modal" data-target="#new_team_modal">Add Team</button>';
        team_list_table_html += '</div>';
        team_list_table_html += '</div>';
        team_list_table_html += '<div class="row">';
        team_list_table_html += '<div class="table-responsive  tables">';
        team_list_table_html += '<table class="table table-hover myTable">';
        team_list_table_html += '<thead>';
        team_list_table_html += '<tr>';
        team_list_table_html += '<th>Team name</th>';
        // team_list_table_html += '<th>Team display name</th>';
        team_list_table_html += '<th>Team description</th>';
        team_list_table_html += '<th></th>';
        team_list_table_html += '<th></th>';
        team_list_table_html += '</tr>';
        team_list_table_html += '</thead>';
        team_list_table_html += '<tbody>';
        for (var i = 0; i < team_count; i++) {
            team_list_table_html += '<tr>';
            team_list_table_html += '<td>' + team_list[i].name + '</td>';
            // team_list_table_html += '<td>' + team_list[i].display_name + '</td>';
            team_list_table_html += '<td>' + team_list[i].description + '</td>';
            team_list_table_html += '<td><button id="' + team_list[i].id + '" class="btn btn-primary update_team btn-sm" data-toggle="modal" data-target="#new_team_modal"><i class="fas fa-pencil-alt"></i></button></td>';
            team_list_table_html += '<td><button id="' + team_list[i].id + '" class="btn btn-danger delete_teamt btn-sm"><i class="far fa-trash-alt"></i></button></td>';
            team_list_table_html += '</tr>';
        }
        team_list_table_html += '</tbody>';
        team_list_table_html += '</table>';
        team_list_table_html += '</div>';
        team_list_table_html += '</div>';
        $(".task_content").empty().append(team_list_table_html);
        deleteTeam();
        newTeamModal();

    }


    function teamsList() {

        $(".teams").off("click");
        $(".teams").click(function () {
            clearInterval(x);
             localStorage.setItem("page", 5);
            // $(this).off("click");
            teamListTable();
            updateTeam();
            // deleteTeam();
            board();

        });
    }


    function closeUpdateUser(ur) {
        $(".close_update_user").click(function () {
            $(".modal-backdrop").css('position', "relative");
            $("body").removeClass("modal-open");
            userList();
            updateUser();
            deleteUser();
            $(".user_update_message").text("");
        });

    }

    function dooUpdateUser(ur) {
        $(".doo_update").click(function () {
            var user_id, name, first_name, last_name, email, password, role, error = false, error_message, team, point,img;
            user_id = $(this).attr("user_id");

            name = $(".name").val();
            first_name = $(".first_name").val();
            last_name = $(".last_name").val();
            email = $(".email").val();
            password = $(".password").val();
            role = $(".role").val();
            team = $(".team").val();
            img = $("#imgInput")[0].files[0];
            if(img == undefined){

                img = "No change";
            }else{


                var formData = new FormData();
                formData.append('file', $("#imgInput")[0].files[0]);

                $.ajaxSetup({
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    }
                });

                 $.ajax({
                   //  headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
                    url: '/updateimg/' + user_id,
                    type: 'POST',
                    dataType: 'JSON',
                    data: formData,

                    // cache: false,
                    processData: false,
                    contentType: false,
                    success: function (data) {

                     },
                });
            }


            if (name == "") {
                error = true;
                error_message = "Name is required";
            } else if (first_name == "") {
                error = true;
                error_message = "First Name is required";
            } else if (last_name == "") {
                error = true;
                error_message = "Last Name required";
            } else if (email == "") {
                error = true;
                error_message = "Email is required";
            }


            if (error) {
                $(".user_update_message").text(error_message).css("color", "red");
            } else {
                $(".user_update_message").text("");
                var data = {
                    "name": name,
                    "first_name": first_name,
                    "last_name": last_name,
                    "email": email,
                    "password": password,
                    "role": role,
                    "team": team,
                };
                var update_user_answer = sendAjax(data, "/updateuser/" + user_id);
                if(ur == "user_pg"){

                    $(".user_name").text(name);
                    $("#"+user_id).find("a").text(name);
                }
                $(".user_update_message").text(update_user_answer.message).css("color", (update_user_answer.status == 200 ? 'green' : 'red'));
            }

            closeUpdateUser(ur);

        });

    }


    function updateUser(ur) {
        $(".update_user").off("click");
        $(".update_user").click(function () {
            $(this).off('click');
            $(this).removeClass("update_user");
            $(this).find("i").attr("class", "fas fa-save");

            var roles, data = [], roles_count, teams, teams_count;
            $(this).addClass("doo_update");
            roles = sendAjax("", "/getroles");
            teams = roles[1];
            roles = roles[0];
            teams_count = teams.length;
            roles_count = roles.length;
            var classes = ["name", "first_name", "last_name", "email", "password", "role", "team","img"];
            $(this).parent().parent().parent().find(".update_user_date").each(function (index, element) {

                var user_change_input = "<input class='form-control update_user_data_save " + classes[index] + "' type='" + ($(this).prev().text() == 'Password' ? 'password' : 'text') + "' value='" + $(this).text() + "'>";
                if ($(this).prev().text() == "Role") {
                    var role = $(this).text();
                    user_change_input = "<select class='role form-control update_user_data_save " + classes[index] + "'>";
                    for (var i = 0; i < roles_count; i++) {
                        user_change_input += '<option  value="' + roles[i].id + '"' + (roles[i].name == role ? 'selected' : '') + '>' + roles[i].name + '</option>';
                    }
                    user_change_input += "</select>";
                }
                else if ($(this).prev().text() == "Team") {
                    var team = $(this).text();
                    user_change_input = "<select class='team form-control update_user_data_save " + classes[index] + "'>";
                    for (var i = 0; i < teams_count; i++) {
                        user_change_input += '<option  value="' + teams[i].id + '"' + (teams[i].name == team ? 'selected' : '') + '>' + teams[i].name + '</option>';
                    }
                    user_change_input += '<option  value="no_team">No team</option>';

                    user_change_input += "</select>";
                }else if($(this).prev().text() == "User Image"){

                    var user_img = $(this).find(".user_img_for_update").attr("src");
                    user_change_input = '<input type="file" name="img" id="imgInput" class="form-control update_user_data_save usr_' + classes[index] + '">';
                    user_change_input += '<div class="imgAbt">';
                    user_change_input += '<img  src="' + user_img + '" class="img-thumbnail usr_imgg" alt="Cinque Terre" width="250" height="200">';
                    user_change_input += '</div>';




                }

                $(this).empty().append(user_change_input);
                $(".frm").append($(this));

                $("#imgInput").change(function(){
                    // ;
                    $(".imgAbt").empty().append("<img id='image' src='#' class='img-thumbnail' width='304' height='236' />");
                    readURL(this);
                });

            });

            dooUpdateUser(ur);
            closeUpdateUser();
            $(".user_update_message").text("");
        });
    }


    function userList() {
        localStorage.setItem("page", 4);
        var users, users_count, userss;
        users = sendAjax("", "/adduser");
        console.log(users);
        users_count = users.length;

        var users_list_html = '';
        users_list_html += '<div class="container-fluid">';
        users_list_html += '<div class="row tasks_row">';
        users_list_html += '<div class="col-md-8">';

        users_list_html += '<h2>Users</h2>';
        users_list_html += '</div>';
        users_list_html += '</div>';

        users_list_html += '</div>';
        users_list_html += '<div class="table-responsive  tables">';
        users_list_html += '<table class="table table-hover myTable">';
        users_list_html += '<thead>';
        users_list_html += '<tr>';
        users_list_html += '<th>Name</th>';
        users_list_html += '<th>First Name</th>';
        users_list_html += '<th>Last Name</th>';
        users_list_html += '<th>Email</th>';
        users_list_html += '<th></th>';
        users_list_html += '<tr>';
        users_list_html += '</thead>';
        users_list_html += '<tbody>';
        for (var i = 0; i < users_count; i++) {
            users_list_html += '<tr>';
            users_list_html += '<td>' + users[i].name + '</td>';
            users_list_html += '<td>' + users[i].first_name + '</td>';
            users_list_html += '<td>' + users[i].last_name + '</td>';
            users_list_html += '<td>' + users[i].email + '</td>';
            users_list_html += '<td><button class="btn btn-primary btn-sm" data-toggle="modal" data-target="#myModal' + users[i].id + '"><i class="fas fa-eye"></i></button></td>';
            // users_list_html += '<td><button class="btn btn-danger delete_user">Delete</button></td>';
            users_list_html += '</tr>';
        }
        users_list_html += '</tbody>';
        users_list_html += '</table>';
        users_list_html += '</div>';

        for (var i = 0; i < users_count; i++) {

            users_list_html += '<div  class="modal fade" id="myModal' + users[i].id + '" role="dialog">';
            users_list_html += '<div class="modal-dialog  modal-dialog-centered modal-lg">';
            users_list_html += '<div class="modal-content">';

            users_list_html += '<div class="modal-header btn-primary rounded-top">';

            users_list_html += '<button user_id="' + users[i].id + '"  class="btn btn-success update_user btn-sm"><i class="fas fa-edit"></i></button>';

            if(users[i].status == "0"){

                var icon = "fas fa-lock-open";
            }else{

                var icon = "fas fa-lock";
            }

            users_list_html += '<button user_id="' + users[i].id + '" data-original-title="Remove this user" class="btn btn-sm btn-danger pull-right delete_user"><i class="' + icon + '"></i></button>';
            users_list_html += '</div>';

            users_list_html += '<div class="modal-body">';
            users_list_html += '<form enctype="multipart/form-data">';
            users_list_html += '<table class="table table-user-information">';
            users_list_html += '<tbody>';
            users_list_html += '<tr>';
            users_list_html += '<td>Name</td>';
            users_list_html += '<td class="update_user_date">' + users[i].name + '</td>';
            users_list_html += '</tr>';
            users_list_html += '<tr>';
            users_list_html += '<td>First Name</td>';
            users_list_html += '<td class="update_user_date">' + users[i].first_name + '</td>';
            users_list_html += '</tr>';
            users_list_html += '<tr>';
            users_list_html += '<td>Last Name</td>';
            users_list_html += '<td class="update_user_date">' + users[i].last_name + '</td>';
            users_list_html += '</tr>';
            users_list_html += '<tr>';
            users_list_html += '<td>Email</td>';
            users_list_html += '<td class="update_user_date">' + users[i].email + '</td>';
            users_list_html += '</tr>';
            users_list_html += '<tr>';
            users_list_html += '<td>Password</td>';
            users_list_html += '<td class="update_user_date"></td>';
            users_list_html += '</tr>';
            users_list_html += '<tr>';
            users_list_html += '<td class="user_role">Role</td>';
            users_list_html += '<td class="update_user_date">' + users[i]["roles"][0].name + '</td>';
            users_list_html += '</tr>';

            users_list_html += '<tr>';
            users_list_html += '<td class="user_role">Team</td>';
            users_list_html += '<td class="update_user_date">' + (users[i]["team"].length != 0 ? users[i]["team"][0].name : 'No team') + '</td>';
            users_list_html += '</tr>';


            users_list_html += '<tr>';
            users_list_html += '<td class="user_role">User Point</td>';
            users_list_html += '<td class="update_user_point">' + users[i].point + '</td>';
            users_list_html += '</tr>';



            users_list_html += '<tr>';
            users_list_html += '<td class="user_image">User Image</td>';
            users_list_html += '<td class="update_user_img update_user_date"><img  src="/image/' + users[i].img + '" width="250px" height="200px" class="user_img_for_update"></td>';
            users_list_html += '</tr>';




            users_list_html += '</tbody>';
            users_list_html += '</table>';
            users_list_html += '</form>';
            users_list_html += '</div>';

            users_list_html += '<div class="modal-footer">';
            users_list_html += '<div class="user_update_message col-md-6 col-sm-6"></div>';
            users_list_html += '<div class="col-md-6 col-sm-6 text-right">';
            users_list_html += '<button type="button" class="btn btn-danger close_update_user" data-dismiss="modal">Close</button>';
            users_list_html += '</div>';
            users_list_html += '</div>';

            users_list_html += '</div>';
            users_list_html += '</div>';
            users_list_html += '</div>';

        }
        users_list_html += '</div>';


        $(".task_content").empty().append(users_list_html);
    }

    function usersList() {

        $(".users_list").off("click");
        $(".users_list").click(function () {

            clearInterval(x);
            userList();
            updateUser("users");
            deleteUser();
            board();

            teamsList();


        });
        board()
    }


    var CSRF_TOKEN = $('meta[name="csrf-token"]').attr('content');


    function newUser(data) {
        var roles_count = data.roles.length;
        var projects_count = data.projects.length;
        var tasks_count = data.tasks.length;
        var teams_count = data.teams.length;
        var permissions_count = data.permissions.length;
        var new_user = "";

        new_user += '<div class="card-body">';
        new_user += '<form>';
        new_user += '<div class="row">';

        new_user += '<div class="col-md-6">';
        new_user += '<div class="form-group">';
        new_user += '<label for="search_user_name">User name</label>';
        new_user += '<input readonly class="form-control" id="search_user_name" type="text" name="search_user_name" value="' + data.msg.name + '">';
        new_user += '</div>';
        new_user += '</div>';

        new_user += '<div class="col-md-6">';
        new_user += '<div class="form-group">';
        new_user += '<label for="select_role">Select role</label>';
        new_user += '<select id="select_role" class="form-control">';
        for (var i = 0; i < roles_count; i++) {
            if (data.roles[i].name != "User") {
                new_user += "<option value='" + data.roles[i].id + "'>" + data.roles[i].name + "</option>";
            } else {
                new_user += "<option value='" + data.roles[i].id + "' selected>" + data.roles[i].name + "</option>";
            }
        }
        new_user += '</select>';
        new_user += '</div>';
        new_user += '</div>';

        new_user += '<div class="col-md-6">';
        new_user += '<div class="form-group">';
        new_user += '<label for="select_role">Select project</label>';
        new_user += '<select id="select_project" class="form-control">';
        for (var i = 0; i < projects_count; i++) {
            new_user += "<option value='" + data.projects[i].id + "'>" + data.projects[i].title + "</option>";
        }
        new_user += '</select>';
        new_user += '</div>';
        new_user += '</div>';


        new_user += '<div class="col-md-6">';
        new_user += '<div class="form-group">';
        new_user += '<label for="select_role">Select task</label>';
        new_user += '<select id="select_task" class="form-control">';
        for (var i = 0; i < tasks_count; i++) {
            new_user += "<option value='" + data.tasks[i].id + "'>" + data.tasks[i].title + "</option>";
        }
        new_user += '</select>';
        new_user += '</div>';
        new_user += '</div>';

        new_user += '<div class="col-md-6">';
        new_user += '<div class="form-group">';
        new_user += '<label for="select_role">Select team</label>';
        new_user += '<select id="select_team" class="form-control">';
        new_user += "<option value='no_team'>No team</option>";
        for (var i = 0; i < teams_count; i++) {
            new_user += "<option value='" + data.teams[i].id + "'>" + data.teams[i].name + "</option>";
        }
        new_user += '</select>';
        new_user += '</div>';
        new_user += '</div>';

        new_user += '<div class="col-md-8">';
        new_user += '<div class="form-group">';
        new_user += '<button type="button" class="btn btn-primary save_user">Save</button>';
        new_user += '</div>';
        new_user += '</div>';

        new_user += '<div>';

        new_user += '</form>';
        new_user += '</div>';

        return new_user;
    }


    function newProject(event, id) {
        var project_title_value, project_description_value;
        if (event == "create") {

            project_title_value = "";
            project_description_value = "";
        } else if (event == "update") {

            var ajax_answer = sendAjax({"id": id}, "/updateproject");
            project_title_value = ajax_answer.title;
            project_description_value = ajax_answer.description;
        }
        var new_project = "";
        new_project += '<div class="card-body">';
        new_project += '<form>';
        new_project += '<div class="row">';

        new_project += '<div class="col-md-12">';
        new_project += '<div class="form-group">';
        new_project += '<label for="project_title">Project title</label>';
        new_project += '<input class="form-control project_title" id="project_title" type="text" name="title" value="' + project_title_value + '">';
        new_project += '</div>';
        new_project += '</div>';


        new_project += '<div class="col-md-12">';
        new_project += '<div class="form-group">';
        new_project += '<label for="project_description">Project description</label>';
        new_project += '<textarea style="height: auto!important; resize: none;" rows="4" class="form-control project_description" id="project_description" type="text" name="description">';
        new_project += project_description_value;
        new_project += '</textarea>';
        new_project += '</div>';
        new_project += '</div>';

        new_project += '<div class="col-md-8">';
        new_project += '<div class="form-group">';
        new_project += '<button id="save_project" type="button" class="btn btn-info save_project">Save</button>';
        new_project += '</div>';
        new_project += '</div>';

        new_project += '</div>';
        new_project += '</form>';
        new_project += '</div>';

        return new_project;
    }


    // $(".add_new_project").click(function () {
    //     $(".add_prohect").empty().append(newProject("create",""));
    // });

    function searchUser() {
        $("#search_user").click(function () {

            if ($(".search_user").val() != "") {
                $.ajax({
                    url: '/postajax',
                    type: 'POST',
                    data: {_token: CSRF_TOKEN, message: $(".search_user").val()},
                    dataType: 'JSON',

                    success: function (data) {
                        if (data.msg == null) {
                            $(".error_msg").empty().append(
                                '<div class="alert alert-danger col-md-4">' +
                                '<strong>User not found</strong>' +
                                '</div>'
                            );
                        } else {
                            $(".error_msg").empty();
                            $(".search_user").val("");
                            $(".error_msg").empty().append(newUser(data));
                            saveUser();
                        }
                    }
                });
            } else {
                $(".error_msg").empty().append(
                    '<div class="alert alert-danger col-md-4">' +
                    '<strong>Please indicate user name</strong>' +
                    '</div>'
                );
            }

            $(".modal_close").click(function () {
                $(".error_msg").empty();
                $(".search_user").val("");
                board();
            });

            board();
        });
    }


    function valid(event, id) {
        $("#save_project").on('click', function () {
            // $(this).off('click');

            var project_title, project_description, error, error_message, project_array = [];

            project_title = $("input[name='title']").val();
            project_description = $("textarea[name='description']").val();

            if (project_title == "") {
                error = true;
                error_message = 'Title is required';
            } else if (project_description == "") {
                error = true;
                error_message = 'Description is required';
            }

            if (error) {
                $(".error_msg").css({"display": "block", "color": "red"}).text(error_message);
            } else {
                // project_array.push(project_title, project_description);
                $(".error_msg").text("");
                var data = {"title": project_title, "description": project_description};
                if (event == "create") {
                    var path = "/addproject";
                } else {
                    data.id = id;
                    var path = "/doupdateproject";
                }
                var ajax_answer = sendAjax(data, path);


                if (ajax_answer === "Added new project") {
                    $("input[name='title']").val("");
                    $("textarea[name='description']").val("");
                    $(".error_msg").css({"display": "block", "color": "#33cc33"}).text(ajax_answer);
                } else if (ajax_answer === 'Error! try again') {
                    $(".error_msg").css({"display": "block", "color": "red"}).text(ajax_answer);
                } else if (ajax_answer[0] === "The title field is required.") {
                    $(".error_msg").css({"display": "block", "color": "red"}).text(ajax_answer[0]);
                } else if (ajax_answer[0] === "The description field is required.") {
                    $(".error_msg").css({"display": "block", "color": "red"}).text(ajax_answer[0]);
                } else if (ajax_answer[0] === "The title has already been taken.") {
                    $(".error_msg").css({"display": "block", "color": "red"}).text(ajax_answer[0]);
                } else if (ajax_answer === "Project updaed") {
                    $(".error_msg").css({"display": "block", "color": "#33cc33"}).text(ajax_answer);
                }
            }

            $(".close_update_modal").click(function () {

                $("input[name='title']").val("");
                $("textarea[name='description']").val("");
                $("body").removeClass("modal-open");
                $(".error_msg").text("");
                projectList();
                delteProject();
            });
        });
    }


    function projectValidation() {
        $(".add_new_project").click(function () {
            $(".modal-body").empty().append(newProject("create", ""));
            valid("create");

            board();
        });

    }


    function saveUser() {
        $(".save_user").click(function () {
            var name, role, project, task, team;
            name = $("#search_user_name").val();
            role = $("#select_role").val();
            project = $("#select_project").val();
            task = $("#select_task").val();
            team = $("#select_team").val();
            var data = {"name": name, "role": role, "project": project, "task": task, "team": team};
            var ajax_answer = sendAjax(data, "/addnewuser");
        });
    }


    function projectList() {
        var projects = sendAjax("", "/projects");
        var projects_count = projects.length;
        var projects_html = '';
        projects_html += '<div class="container-fluid">';

        projects_html += '<div class="row tasks_row">';
        projects_html += '<div class="col-md-8">';

        projects_html += '<h2>Projects</h2>';
        projects_html += '</div>';
        projects_html += '<div class="col-md-4 text-right">';

        projects_html += '<button class="btn btn-primary add_new_project" data-toggle="modal" data-target="#new_project_modal">New Project</button>';
        projects_html += '</div>';
        projects_html += '</div>';
        projects_html += '</div>';

        projects_html += ' <div class="table-responsive  tables">';
        projects_html += '<table class="table table-hover myTable">';
        projects_html += '<thead>';
        projects_html += '<tr>';
        projects_html += '<th>Project title</th>';
        projects_html += '<th>Project Description</th>';
        projects_html += '<th></th>';
        projects_html += '<th></th>';
        projects_html += '</tr>';
        projects_html += '</thead>';
        projects_html += '<tbody>';
        for (var i = 0; i < projects_count; i++) {
            projects_html += '<tr>';
            projects_html += '<td>' + projects[i].title + '</td>';
            projects_html += '<td>' + projects[i].description + '</td>';
            projects_html += '<td><button id="' + projects[i].id + '" class="btn btn-primary update_project btn-sm" data-toggle="modal" data-target="#new_project_modal"><i class="fas fa-pencil-alt"></i></button></td>';
            projects_html += '<td><button id="' + projects[i].id + '" class="btn btn-danger delete_project btn-sm"><i class="far fa-trash-alt"></i></button></td>';
            projects_html += '</tr>';
        }
        projects_html += '</tbody>';
        projects_html += '</table>';
        projects_html += '</div>';
        $(".task_content").empty().append(projects_html);
        updateProject();
    }

    function tasksList() {

        var tasks, task_creators, work_user, tasks_count, task, user_role;
        tasks = sendAjax("", "/tasks");

        user_role = tasks[1][0].name;
        tasks_count = tasks[0].length;

        var tasks_list_html = '';
        tasks_list_html += '<div class="container-fluid">';
        tasks_list_html += '<div class="row tasks_row">';
        tasks_list_html += '<div class="col-md-8">';

        tasks_list_html += '<h2>Tasks</h2>';
        tasks_list_html += '</div>';
        tasks_list_html += '<div class="col-md-4 text-center">';

        tasks_list_html += '<button class="btn btn-primary add_new_task btn-xs"  data-toggle="modal" data-target="#viewModal">New Task</button>';
        tasks_list_html += '</div>';
        tasks_list_html += '</div>';
        tasks_list_html += '</div>';
        tasks_list_html += ' <div class="table-responsive  tables">';
        tasks_list_html += '<table class="table table-hover myTable">';
        tasks_list_html += '<thead >';
        tasks_list_html += '<tr>';
        tasks_list_html += '<th >Task Title</th>';
        tasks_list_html += '<th>Task Description</th>';
        tasks_list_html += '<th>Prioritet</th>';
        tasks_list_html += '<th>Start</th>';
        tasks_list_html += '<th>End</th>';
        tasks_list_html += '<th>User</th>';
        tasks_list_html += '<th>Added</th>';
        tasks_list_html += '<th></th>';
        tasks_list_html += '<th></th>';
        tasks_list_html += '</tr>';
        tasks_list_html += '</thead>';
        tasks_list_html += '';
        tasks_list_html += '<tbody>';

        for (var i = 0; i < tasks_count; i++) {

            if(tasks[1][0].name == "Task manager"){


                task_creators = tasks[0][i]["user"][0];
                work_user = tasks[0][i].works[0].user[0];

                if(work_user == undefined){

                    work_user = "This user deleted"
                }
                task = tasks[0][i].works[0].task[0];


            }else{


                task_creators = tasks[0][i]["user"][0];
                work_user = tasks[0][i]["tasks"][0]["user"][0];

                if(work_user == undefined){

                    work_user = "This user deleted"
                }
                task = tasks[0][i]["tasks"][0]["task"][0];
            }

            // task = tasks[0][i]["tasks"][0]["task"][0];
            tasks_list_html += '<tr  id="' + task.id + '" class="task_view" >';
            tasks_list_html += '<td>' + task.title + '</td>';
            tasks_list_html += '<td>' + task.description + '</td>';
            tasks_list_html += '<td>' + task.prioritet + '</td>';
            tasks_list_html += '<td>' + task.start + '</td>';
            tasks_list_html += '<td>' + task.end + '</td>';
            tasks_list_html += '<td>' + work_user.name + '</td>';
            tasks_list_html += '<td>' + task_creators.name + '</td>';
            tasks_list_html += '<td><button id="' + task.id + '" class="btn btn-primary task_edit btn-sm" data-toggle="modal" data-target="#viewModal"><i class="fas fa-pencil-alt"></i></button></td>';
            tasks_list_html += '<td><button id="' + task.id + '" class="btn btn-danger delete_task btn-sm"><i class="far fa-trash-alt"></i></button></td>';

            tasks_list_html += '</tr>';

        }

        tasks_list_html += '</tbody>';

        tasks_list_html += '</table>';

        tasks_list_html += '</div>';

        $(".task_content").empty().append(tasks_list_html);

        deleteTask();

        if (user_role != "Admin" && user_role != "Task manager" && user_role != "Task editor") {
            $(".task_edit").remove();
        }

        if (user_role != "Admin" && user_role != "Task manager") {
            $(".delete_task").remove();
        }

    }

    function tasks() {

        $(".tasks").off("click");
        $(".tasks").click(function () {
            clearInterval(x);
            var page = 1;
            localStorage.setItem("page", page);
            tasksList();
            taskForUser();
            // deleteTask();
            teamsList();
        });
    }



    // tasks();

    function projects() {

        $(".projects").off("click");
        $(".projects").click(function () {
            clearInterval(x);
            var page = 2;
            localStorage.setItem("page", page);
            projectList();
            newProjectModal();
            delteProject();
            updateProject();
            teamsList();
        });
    }

    function addUserModal() {
        var modal = '';
        modal += '<div class="lolo modal animated bounceIn add_user_modal" id="upload-avatar" tabindex="-1" role="dialog" aria-labelledby="upload-avatar-title" aria-hidden="true">';
        modal += '<div class="modal-dialog">';
        modal += '<div class="modal-content">';
        modal += '<div class="modal-header"> <h4 class="modal-title" id="upload-avatar-title" >Create new user</h4></div>';
        modal += '<div class="modal-body">';

        modal += '<div class="container">';
        modal += '<div class="row">';
        modal += '<div class="col-md-12">';
        modal += '<div id="custom-search-input">';
        modal += '<div class="input-group col-md-4">';
        modal += '<input name="search_user" type="text" class="form-control search_user" placeholder="Search"/>';
        modal += '<span class="input-group-btn">';
        modal += '<button id="search_user" class="btn btn-info btn-lg" type="button">';
        modal += '<i class="fa fa-search"></i>';
        modal += '</button>';
        modal += '</span>';
        modal += '</div>';
        modal += '<div class="error_msg">';
        modal += '</div>';
        modal += '</div>';
        modal += '</div>';
        modal += '</div>';
        modal += '</div>';

        modal += '</div>';
        modal += '<div class="modal-footer">';
        modal += '<button class="btn btn-secondary" data-dismiss="modal" aria-hidden="true">Close</button>';
        modal += '</div>';
        modal += '</div>';
        modal += '</div>';
        modal += '</div>';

        $(".for_create_user_modal").empty().append(modal);
        searchUser();
        saveUser();

    }


    function newProjectModal() {
        var new_project_modal = '';
        new_project_modal += '<div  class=" modal  add_user_modal" id="new_project_modal" tabindex="-1" role="dialog" aria-labelledby="upload-avatar-title" aria-hidden="true">';
        new_project_modal += '<div  class="modal-dialog modal-lg">';
        new_project_modal += '<div class="modal-content">';
        new_project_modal += '<div class="modal-header btn-primary rounded-top"> <h4 class="modal-title" id="upload-avatar-title"> Project</h4></div>';
        new_project_modal += '<div class="modal-body">';

        new_project_modal += '</div>';
        new_project_modal += '<div class="modal-footer text-left">';
        new_project_modal += '<div class="error_msg col-md-6 col-sm-6 " ></div>';
        new_project_modal += '<div class="col-md-6 col-sm-6 text-right">';
        new_project_modal += '<button class="btn btn-secondary close_update_modal" data-dismiss="modal" aria-hidden="true">Close</button>';
        new_project_modal += '</div>';
        new_project_modal += '</div>';
        new_project_modal += '</div>';
        new_project_modal += '</div>';
        new_project_modal += '</div>';

        new_project_modal += '<div class="for_create_user_modal"></div>';
        $(".for_modal").empty().append(new_project_modal);
        $(".modal-body").empty().append(newProject("create", ""));
        projectValidation();
    }


    function delteProject() {
        $(".delete_project").click(function () {
            var project_id = $(this).attr("id");
            var ajax_answer = sendAjax({"id": project_id}, "/deleteproject");
            if (ajax_answer == "Project deleted") {
                $(this).parents("tr").remove();
            } else {
                alert(ajax_answer);

            }
        });
        board();
    }

    function updateProject() {
        $(".update_project").off("click");
        $(".update_project").click(function () {

            var project_id = $(this).attr("id");
            $(".modal-body").empty().append(newProject("update", project_id));
            $(".close_update_modal").click(function () {
                $(this).off('click');
                $("input[name='title']").val("");
                $("textarea[name='description']").val("");
                $("error_msg").text("");
                projectList();
                delteProject();
                board();
                projectValidation();
            });
            valid("update", project_id);
            board();
        });
    }


    function checkDuplicate(element, dataArray) {
        for (var i = 0; i < dataArray.length; i++) {
            if (dataArray[i].name == element.name) {
                return true;
            }
        }
        return false;
    }

    function addUserNextTask(dataArray, userName,  task){
        for(var i = 0; i < dataArray.length; i++){
            if(dataArray[i].name == userName){
                dataArray[i].task.push(task);
            }
        }
    }

    function dashBoard() {

        var array_for_users_id = [];
        var board_answer = sendAjax("", "/getboard");

        $(".go_user_page").attr("user_id",board_answer[0].id);
        $(".go_user_page").attr("data-toggle","modal");
        $(".go_user_page").attr("data-target","#userpg"+board_answer[0].id);

        $(".go_user_page").off("click");
        $(".go_user_page").click(function () {

            userPg(board_answer[0].id);
        });


        if (board_answer[0].roles[0].name == "Task manager") {
            var maneger = board_answer[0].manager;

            var maeger_tasks_length = maneger.length;
            var dataArray = [];

            for (var m = 0; m < maeger_tasks_length; m++) {
                var userInfo = maneger[m].works[0].user[0];
                var isExistUser = checkDuplicate(userInfo, dataArray);

                if (isExistUser == true){
                    var userNextTask = maneger[m].works[0].task[0];
                    addUserNextTask(dataArray, userInfo.name, userNextTask);
                    continue;
                }

                userInfo.task = [maneger[m].works[0].task[0]];
                dataArray.push(userInfo);
                // dataObj(arrrrr);
                // other_users.push(dataObj);
                // console.log(board_answer[0].manager[m].works[0].task[0]);
                //task.push(board_answer[0].manager[m].works[0].task[0])

            }

            board_answer[0].other_users  = dataArray;
        }



        var show_message_dropdown_meneger = '<div class="dropdown msg_dropdown_meneger">';
        show_message_dropdown_meneger += '<button class="dropdown-toggle show_message_button_meneger fa fa-bell" type="button" data-toggle="dropdown"><span class="caret"></span></button>';
        show_message_dropdown_meneger += '<ul class="dropdown-menu msg_content">';

        if (board_answer[0].roles[0].name == "Task manager" || board_answer[0].roles[0].name == "Admin") {

           // var other_users_count_meneger = board_answer[0].other_users.length;
            var other_users_count_meneger = board_answer[0].other_users.length;
            var show_message_meneger = 0;

            // var show_message_dropdown_meneger = '<div class="dropdown msg_dropdown_meneger">';
            // show_message_dropdown_meneger += '<button class="dropdown-toggle show_message_button_meneger" type="button" data-toggle="dropdown"><span class="caret"></span></button>';
            // show_message_dropdown_meneger += '<ul class="dropdown-menu msg_content">';

            for (var c = 0; c < other_users_count_meneger; c++) {
                var other_user_task_length_meneger = board_answer[0].other_users[c].task.length;
                for(var d = 0; d < other_user_task_length_meneger; d++){
                    if( board_answer[0].other_users[c].task[d].see_message_meneger == 1 ){

                        show_message_meneger += 1;
                        show_message_dropdown_meneger += '<li class="msg_hover" style="padding-left: 15px;color: black"><a href="#" style="color: black" task_id="' + board_answer[0].other_users[c].task[d].id + '" class="task_show task_msg_meneger" data-toggle="modal" data-target="#viewModal">' + board_answer[0].other_users[c].task[d].title + '</a></li>';

                    }
                }
            }

            // show_message_dropdown_meneger += '<div class="dropdown-divider"></div>'; //stex e
            // show_message_dropdown_meneger += '</ul>';
            // show_message_dropdown_meneger += '</div>';


            show_message_dropdown_meneger += '<div class="dropdown-divider line_for_mng"></div>';
        }


        //stex e
        show_message_dropdown_meneger += '</ul>';
        show_message_dropdown_meneger += '</div>';


        var user_task = board_answer[0].task;
        var user_task_count = board_answer[0].task.length;
        var show_message = 0;

        var show_message_dropdown = '';
        // var show_message_dropdown = '<div class="dropdown msg_dropdown">';
        // show_message_dropdown += '<button class="dropdown-toggle show_message_button" type="button" data-toggle="dropdown"><span class="caret"></span></button>';
        // show_message_dropdown += '<ul class="dropdown-menu">';
        for (var t = 0; t < user_task_count; t++) {

            if (board_answer[0].task[t].see_message != 0) {

                show_message += 1;
                show_message_dropdown += '<li class="msg_hover" style="padding-left: 15px;"><a href="#" style="color: black" task_id="' + board_answer[0].task[t].id + '" class="task_show task_msg" data-toggle="modal" data-target="#viewModal">' + board_answer[0].task[t].title + '</a></li>';
            }
        }
        // show_message_dropdown += '</ul>';
        // show_message_dropdown += '</div>';

        $(".ml-auto").find(".msg_dropdown_meneger").empty();
        $(".ml-auto").prepend(show_message_dropdown_meneger);
        if ( show_message_meneger > 0 ) {

            // $(".ml-auto").find(".msg_dropdown_meneger").empty();
            // $(".ml-auto").prepend(show_message_dropdown_meneger);
            $(".show_message_button_meneger").text(show_message_meneger);

            $(".task_msg_meneger").click(function () {

                var count_msg = Number($(".show_message_button_meneger").text());

                var id = $(this).attr("task_id");
                var data = {for:"user"};
                var delete_task_msg_answer = sendAjax("", "/deletetaskmsganswer/" + id);

                if (delete_task_msg_answer == "Succies") {

                    count_msg = count_msg - 1;
                    if (count_msg < 1) {

                        $(".msg_dropdown_meneger").remove();
                    } else {

                        $(".show_message_button_meneger").text(count_msg);
                    }
                    $(this).remove();
                }
            });
        }


        if (show_message > 0) {

            var cnt = Number($(".show_message_button_meneger").text()) + show_message;

            // $(".msg_dropdown_meneger").prepend('<i class="fa fa-bell" style="font-size:24px;color:red"></i>');
            $(".show_message_button_meneger").text(cnt);
            $(".msg_content").append(show_message_dropdown);
            ;            // $(".ml-auto").find(".msg_dropdown").empty();
            // $(".ml-auto").prepend(show_message_dropdown);
            // $(".show_message_button").text(show_message);

            $(".task_msg").click(function () {

                // var count_msg = Number($(".show_message_button").text());
                var count_msg = Number($(".show_message_button_meneger").text());

                var id = $(this).attr("task_id");
                var data = {for:"user"};
                var delete_task_msg_answer = sendAjax("for_user", "/deletetaskmsganswer/" + id);

                if (delete_task_msg_answer == "Succies") {



                    count_msg = count_msg - 1;
                    if (count_msg < 1) {

                        // $(".msg_dropdown").remove();
                        $(".msg_dropdown_meneger").remove();
                    } else {

                        $(".show_message_button_meneger").text(count_msg);
                    }
                    $(this).remove();
                    if($(".task_msg").length < 1){

                        $(".line_for_mng").remove();
                    }
                }
            });

        }else{

            $(".line_for_mng").remove();
        }

        if(cnt == undefined && show_message_meneger < 1){

            $(".show_message_button_meneger").hide();
        }

        if (board_answer[0].roles[0].name == "User") {

            $(".menu_link").remove();
        } else if (board_answer[0].roles[0].name != "User") {

            if (board_answer[0].roles[0].name == "Task manager" || board_answer[0].roles[0].name == "Task Editor") {

                $(".menu_link").each(function () {
                    if (!$(this).hasClass("tasks") && !$(this).hasClass("dashboard")) {

                        $(this).remove();
                    }
                })
            }
        }


        var check_team = 'team' in board_answer[0];

        var auth_user_tasks_length = board_answer[0].task.length;

        if (check_team) {
            if(board_answer[0].other_users = board_answer[0].team.length > 0){

                board_answer[0].other_users = board_answer[0].team[0].users;
            }

        }

        var other_users_count = board_answer[0].other_users.length;
        var other_users = board_answer[0].other_users;
        var board_html = '';

        board_html += ' <div class="row todo_header  justify-content-md-center" style="margin: 0 auto;padding-bottom: 35px">';
        board_html += '<div class="bg-primary text-white col-md-3" style="text-align: center">No prioritet</div>';
        board_html += '<div class="bg-warning text-white col-md-3" style="text-align: center">Unimportant</div>';
        board_html += '<div class="bg-success text-white col-md-3" style="text-align: center">Middle</div>';
        board_html += '<div class="bg-danger text-white col-md-3" style="text-align: center">Critical</div>';
        board_html += '</div>';


        board_html += ' <div class="row todo_header  justify-content-md-center" style="margin: 0 auto;">';





        board_html += '<div class="col-md-2 offset-2 todo_header ">';
        board_html += '<h3>Tasks</h3>';
        board_html += '</div>';

        board_html += '<div class="col-md-2 todo_header ">';
        board_html += '<h3>In Progress</h3>';
        board_html += '</div>';

        board_html += '<div class="col-md-2  todo_header  ">';
        board_html += '<h3>Test</h3>';
        board_html += '</div>';


        board_html += '<div class="col-md-2 todo_header">';
        board_html += '<h3>Discussion</h3>';
        board_html += '</div>';


        board_html += '<div class="col-md-2 todo_header">';
        board_html += '<h3>Finish</h3>';
        board_html += '</div>';

        board_html += ' </div>';

        board_html += '<div class="bs-example">';
        board_html += ' <div class="panel-group" id="accordion">';

        var check_other = false;
        if(other_users.length > 0){

            for(var uu = 0; uu < other_users.length; uu++){

                if(other_users[uu].id == board_answer[0].id){
                    check_other = true;

                    // other_users.splice(uu,1)
                    var x = other_users[uu];
                    var y = other_users[0]
                    other_users[uu] = y;
                    other_users[0] = x;

                }
            }

            // board_html += setBoardCols(other_users, array_for_users_id);
        }

        if(!check_other){
            board_html += setBoardCols(board_answer, array_for_users_id);
        }

        if (board_answer[0].roles[0].name == "Admin" || board_answer[0].roles[0].name == "Task manager") {


            if(other_users.length > 0){

                board_html += setBoardCols(other_users, array_for_users_id);
            }

            if(board_answer[0].roles[0].name == "Task manager"){

                for(var z = 0; z < other_users.length; z++){

                    for(var v = 0; v < other_users[z].task.length; v++){

                        // i($("#"+other_users[z].task[v].tester.id).length == 0){
                        if(board_html.indexOf('id=' + '"' +other_users[z].task[v].tester.id + '"') == -1){

                            board_html += setBoardCols([other_users[z].task[v].tester], array_for_users_id);
                        }
                    }

                }
            }

        }

        board_html += '</div>'; //inqn e
        board_html += '</div>'; //inqn e

        $(".task_content").empty().append(board_html);


        setTasks(board_answer);
        userName();
        if(board_answer[0].tasks_for_test != undefined){
            board_answer[0].task = board_answer[0].tasks_for_test;

            setTasks(board_answer);
        }

        setTasks(other_users);

        var array_for_users_id_count = array_for_users_id.length;

        if (array_for_users_id_count > 0) {

            for (var b = 0; b < array_for_users_id_count; b++) {

                var t = 0;
                var t_elem;

                $("#" + array_for_users_id[b]).find(".lolo").each(function () {

                    $this = $(this);
                    if ($this.outerHeight() > t) {
                        t_elem = this;
                        t = $this.outerHeight();
                    }
                });

                $("#" + array_for_users_id[b]).find(".lolo").each(function () {

                    if(t + 25 == 35){

                        t = 120;
                    }


                    $(this).css("height", t + 25 + 'px');

                });
            }
        }

        taskMove(board_answer[0]);
        taskForUser();




        projectValidation();
        usersList();
        projects();
        tasks();

        // taskMove();
        // taskModal();
        taskForUser();
        // deleteTask();
        teamsList();
    }

    function board() {

        $(".dashboard").off("click");
        $(".dashboard").on("click",function () {

            var page = 3;
            localStorage.setItem("page", 3);
            $(".for_modal").empty();
            dashBoard();
            x =  setInterval(function () {dashBoard()  },10000)
            // teamsList()

            // taskBoardModal();
            // taskMove();
        });
    }


    function sendAjax(data, url) {
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });



        var answer = -1;

        $.ajax({
            url: url,
            type: 'POST',
            cache: false,
            async: false,
            data: {data: data},
            dataType: 'JSON',
            // processData: false,
            // contentType: false,

            success: function (data) {
                answer = data;
            },

            error: function (error) {

            }
        });

        return answer;
    }


    function taskBoardModal(type, task_for_user) {
        var task_creator, work_user, task, user, task_point, added, task_views, start_date, end_date, tester, priority,
            project_list,
            project, users_list, users_count,
            project_list_count, title, description,
            prioritet = ["No prioritet", "Unimportant", "Middle", "Critical"],
            prioritet_length = prioritet.length,
            task_position = ["Tasks", "In Process", "Test", "Finish"],
            tasks_position_counth = task_position.length,
            auth_user,
            auth_user_role;

        if (type == "show") {
            task = task_for_user[0]["tasks"][0]["task"][0];
            title = task.title;
            description = task.description;
            task_views = "Show Task";
            // task_creator = task_for_user[0]["user"][0];
            // added = task_for_user[0]["tasks"][0]["user"][0]["name"];
            console.log(task_for_user[0].user.length)


                added = task_for_user[0].user[0].name;


            user = task_for_user[0]["tasks"][0]["user"][0];
            // work_user = task_for_user[0]["tasks"][0]["user"][0];
            work_user = task_for_user[0].tasks[0].user[0].name;
            // task = task_for_user[0]["tasks"][0]["task"][0];
            tester = task_for_user[0]["tasks"][0]["task"][0]["lop"][0];
            users_list = task_for_user["users_list"];
            project = task_for_user[0]["tasks"][0]["task"][0]["project"][0];
            start_date = task_for_user[0]["tasks"][0]["task"][0]["start"];
            end_date = task_for_user[0]["tasks"][0]["task"][0]["end"];
            project_list = task_for_user["projects_list"];
            priority = task_for_user[0]["tasks"][0]["task"];
            project_list_count = project_list.length;
            users_count = users_list.length;
            task_point = task_for_user[0]["tasks"][0]["task"][0]["task_point"];
        } else if (type == "edit") {
            task_views = "Edit Task";

            task_creator = task_for_user[0]["user"][0];
            work_user = task_for_user[0]["tasks"][0]["user"][0];
            task = task_for_user[0]["tasks"][0]["task"][0];
            tester = task_for_user[0]["tasks"][0]["task"][0]["lop"][0];
            users_list = task_for_user["users_list"];
            project = task_for_user[0]["tasks"][0]["task"][0]["project"][0];

            project_list = task_for_user["projects_list"];

            project_list_count = project_list.length;
            users_count = users_list.length;
            task_point = task_for_user[0]["tasks"][0]["task"][0]["task_point"];
            added = task_for_user[0].user[0].name;
            // added = task_for_user[0]["tasks"][0]["user"][0]["name"];

            title = task.title;
            description = task.description;
            user = task_for_user[0]["tasks"][0]["user"][0];
            priority = task_for_user[0]["tasks"][0]["task"][0]["prioritet"];

            start_date = task_for_user[0]["tasks"][0]["task"][0]["start"];
            end_date = task_for_user[0]["tasks"][0]["task"][0]["end"];
        } else if (type == "create") {

            task_views = "Create Task";
            title = " ";
            description = " ";
            task_point = "";
            users_list = task_for_user["users_list"];
            project_list = task_for_user["projects_list"];
            project_list_count = task_for_user["projects_list"]["length"];
            users_count = task_for_user["users_list"]["length"];
        }
        var task_board_html = '';
        task_board_html += '<form class="form-horizontal" id="taskForm">';
        task_board_html += '<div class="modal fade" id="viewModal" role="dialog">';
        task_board_html += '<div class="modal-dialog modal-lg">';
        task_board_html += '<div class="modal-content">';
        task_board_html += '<div class="modal-header btn-primary rounded-top">';
        task_board_html += '<div class="col-md-12">';
        task_board_html += ' <h4 class="modal-title ">' + task_views + '</h4>';
        task_board_html += '</div>';


        task_board_html += '</div>';
        task_board_html += '<div class="modal-body">';

        task_board_html += '<div class="form-group row">';
        task_board_html += '<label class="control-label col-md-2 col-sm-2 col-form-label" for="title">Title:</label>';
        task_board_html += '<div class=" col-md-10 col-sm-10 ">';
        task_board_html += '<input type="email" class="form-control" id="title" name="title" value="' + title + '">';
        task_board_html += '</div>';
        task_board_html += '</div>';

        task_board_html += '<div class="form-group row">';
        task_board_html += '<label class="control-label col-md-2 col-sm-2 col-form-label" for="description"> Description:</label>';
        task_board_html += '<div class=" col-md-10 col-sm-10 ">';
        task_board_html += '<textarea  name="description" class="form-control" id="description"  rows="3">' + description + '</textarea>';
        task_board_html += '</div>';
        task_board_html += '</div>';

        task_board_html += '<div class="form-group row">';
        task_board_html += '<label class="control-label col-md-2 col-sm-2 col-form-label" for="tester">Tester:</label>';
        task_board_html += '<div class=" col-md-10 col-sm-10 ">';

        if (type == "edit") {
            task_board_html += '<select  class="form-control" id="tester">';
            for (var i = 0; i < users_count; i++) {

                task_board_html += '<option value="' + users_list[i].id + '" ' + (users_list[i].id === tester.id ? 'selected' : '') + ' > ' + users_list[i].name + ' </option>';
            }
            task_board_html += '</select>';
        } else if (type == "show") {
            task_board_html += '<input  class="form-control" type="text" name="added_user" class="form-control"  value="' + tester.name + '">'
        } else if (type == "create") {

            auth_user_role = task_for_user.auth_user_role[0].name;
            auth_user = task_for_user.auth_user.id;

            if(auth_user_role == "Task manager"){

                for(var manager_name = 0; manager_name < users_count; manager_name++){

                    if(users_list[manager_name].id == auth_user){

                        users_list.splice(manager_name,1)
                        users_count = users_list.length;
                    }
                }
            }


            task_board_html += '<select  class="form-control" id="tester">';
            for (var z = 0; z < users_count; z++) {

                task_board_html += '<option value="' + users_list[z].id + '"  > ' + users_list[z].name + ' </option>';
            }
        }
        task_board_html += '</select>';
        task_board_html += '</div>';
        task_board_html += '</div>';

        task_board_html += '<div class="form-group row">';
        if (type == "edit" || type == "show") {
            if(added == undefined){

                added = "This user deleted"
            }
            task_board_html += '<label class="control-label col-md-2 col-sm-2 col-form-label" for="added">Added:</label>';
            task_board_html += '<div class=" col-md-10 col-sm-10 ">';
            task_board_html += '<input  readonly name="added_user"  type="added" class="form-control" id="added"  value="' + added + '">';
            task_board_html += '</div>';
        } else if (type == "create") {
            task_board_html += ''
        }
        task_board_html += '</div>';


        task_board_html += '<div class="form-group row">';
        task_board_html += '<label class="control-label col-md-2 col-sm-2 col-form-label" for="user">User:</label>';
        task_board_html += '<div class=" col-md-10 col-sm-10 ">';
        if (type == "edit") {

            task_board_html += '<select class="form-control" id="user">';
            if(work_user == undefined){
                work_user = "This user deleted";
               // task_board_html += '<input readonly  type="text" name="work_user" class="form-control"  value="' + work_user + '">'
                task_board_html += '<option value="user_not_faund" selected>User not faund</option>';

            }



                for (var i = 0; i < users_count; i++) {

                    task_board_html += '<option value="' + users_list[i].id + '" ' + (users_list[i].id === work_user.id ? 'selected' : '') + ' > ' + users_list[i].name + ' </option>';
                }



            task_board_html += '</select>';

        } else if (type == "show") {
            task_board_html += '<input  type="text" name="added_user" class="form-control" id="user" value="' + work_user + '">'
        } else if (type == "create") {


            // if(auth_user_role == "Task manager"){
            //
            //     for(var manager_name = 0; manager_name < users_count; manager_name++){
            //         console.log(users_list[manager_name].id)
            //         if(users_list[manager_name].id == auth_user){
            //
            //             users_list.splice(manager_name,1)
            //             users_count = users_list.length;
            //         }
            //     }
            // }


            task_board_html += '<select class="form-control" id="user">';
            for (var z = 0; z < users_count; z++) {

                task_board_html += '<option value="' + users_list[z].id + '"  > ' + users_list[z].name + ' </option>';
            }
            task_board_html += '</select>';
        }
        task_board_html += '</div>';
        task_board_html += '</div>';

        task_board_html += '<div class="form-group row">';
        task_board_html += '<label class="control-label col-md-2 col-sm-2 col-form-label" for="project">Project:</label>';
        task_board_html += '<div class=" col-md-10 col-sm-10 ">';
        if (type == "edit") {
            task_board_html += '<select class="form-control" id="project">';

            for (var k = 0; k < project_list_count; k++) {
                task_board_html += '<option value="' + project_list[k].id + '" ' + (project.id === project_list[k].id ? 'selected' : '') + ' > ' + project_list[k].title + ' </option>';
            }
            task_board_html += '</select>';
        } else if (type == "show") {
            task_board_html += '<input readonly type="text" name="added_user" class="form-control"  value="' + project.title + '">'
        } else if (type == "create") {
            task_board_html += '<select class="form-control" id="project">';

            for (var k = 0; k < project_list_count; k++) {
                task_board_html += '<option value="' + project_list[k].id + '"  > ' + project_list[k].title + ' </option>';
            }
            task_board_html += '</select>';

        }
        task_board_html += '</div>';
        task_board_html += '</div>';

        task_board_html += '<div class="form-group row">';
        task_board_html += '<label class="control-label col-md-2 col-sm-2 col-form-label" for="createDate">Created date:</label>';
        task_board_html += '<div class=" col-md-10 col-sm-10 ">';
        if (type == "edit") {
            task_board_html += '<input readonly name="create_date" class="form-control" id="createDate"  value="' + start_date + '">';
        } else if (type == "show") {
            task_board_html += '<input  name="create_date" class="form-control"  value="' + start_date + '">';

        } else if (type == "create") {

            task_board_html += '<div class = "input-append date end_datetime" > ';
            task_board_html += '<input  type = "text" name="create_date" class="form-control" id="createDate" >';
            task_board_html += '</div>';


        }
        task_board_html += '</div>';
        task_board_html += '</div>';

        task_board_html += '<div class="form-group row">';
        task_board_html += '<label class="control-label col-md-2 col-sm-2 col-form-label" for="dataEnd">Date of End:</label>';
        task_board_html += '<div class=" col-md-10 col-sm-10 ">';
        if (type == "create" || type == "edit") {
            task_board_html += '<div class = "input-append date end_datetime" > ';
            task_board_html += '<input size = "16" type = "text" id="dataEnd" name="endDate" class="form-control"  value = ""  >';
            task_board_html += '  <span class = "add-on" > <i class = "icon-th" > </i> </span> ';
            task_board_html += '</div>';

        } else if (type == "show") {

            task_board_html += '<input readonly type="text" name="added_user" class="form-control"  value="' + end_date + '">'

        }
        // task_board_html += '<input type="email" class="form-control" id="title" name="title" value="' + title + '">';
        task_board_html += '</div>';
        task_board_html += '</div>';

        task_board_html += '<div class="form-group row">';
        task_board_html += '<label class="control-label col-md-2 col-sm-2 col-form-label" for="title">Priority:</label>';
        task_board_html += '<div class=" col-md-10 col-sm-10 ">';
        // task_board_html += '<input type="email" class="form-control" id="title" name="title" value="' + title + '">';
        if (type == "edit") {
            task_board_html += '<select class="form-control" id="priority">';

            for (var q = 0; q < prioritet_length; q++) {

                task_board_html += '<option value="' + prioritet[q] + '"' + (task.prioritet == prioritet[q] ? 'selected' : '') + '>' + prioritet[q] + '</option>';

            }


            task_board_html += '</select>';
        } else if (type == "show") {
            console.log(prioritet)
            task_board_html += '<input  type="text" name="added_user" class="form-control"  value="' + task.prioritet + '">'

        } else if (type == "create") {

            task_board_html += '<select  class="form-control" id="priority">';

            for (var q = 0; q < prioritet_length; q++) {

                task_board_html += '<option value="' + prioritet[q] + '">' + prioritet[q] + '</option>';

            }


            task_board_html += '</select>';
        }

        task_board_html += '</div>';
        task_board_html += '</div>';

        task_board_html += '<div class="form-group row">';
        task_board_html += '<label class="control-label col-md-2 col-sm-2 col-form-label" for="point">Point:</label>';
        task_board_html += '<div class=" col-md-10 col-sm-10 ">';
        task_board_html += '<input  type="text" name="point"  class="form-control" id="point" value="' + task_point + '">';
        task_board_html += '</div>';
        task_board_html += '</div>';

        if(type == "show"){

            task_board_html += '<div class="form-group row">';
            task_board_html += '<label class="control-label col-md-2 col-sm-2 col-form-label" for="message">Message:</label>';
            task_board_html += '<div class=" col-md-10 col-sm-10 ">';
            task_board_html += '<textarea   class="form-control" id="message"  rows="3" readonly>'+task.message+'</textarea>';
            task_board_html += '</div>';
            task_board_html += '</div>';
        }



        task_board_html += '<div class="col-md-12 text-center">';
        if (type == "show") {
            task_board_html += ""
        } else if (type == "edit") {
            task_board_html += '<button type="button" class="btn btn-success taskEdit" id="' + task.id + '">Edit</button>';

        } else if (type == "create") {
            task_board_html += '<button type="button" class="btn btn-default taskCreate" >Create</button>';

        }
        task_board_html += '</div>';


        task_board_html += '</div>';

        task_board_html += '</form>';


        task_board_html += '<div class="modal-footer">';
        task_board_html += '<div class="col-md-6">';
        task_board_html += '<div id="error_task_edit">';
        task_board_html += '</div>';
        task_board_html += '</div>';

        task_board_html += '<div class="col-md-6 text-right">';
        task_board_html += '<button type="button" class="btn btn-danger "  id="close_modal_task" data-dismiss="modal">Close</button>';
        task_board_html += ' </div>';
        task_board_html += '</div>';
        task_board_html += '</div>';
        task_board_html += '</div>';
        task_board_html += '</div>';
        task_board_html += '</div>';


        $(".for_modal").empty().append(task_board_html);
        if (type == "show") {
            $("input").attr('disabled', 'disabled');
            $("textarea").attr('disabled', 'disabled');
        }
        // $("#close_modal_task ").on("click", function () {
        //     tasksList();
        //     taskForUser();
        //     deleteTask();
        // });
        endDatePicer()
    }


    // function taskModal() {   //hin
    //     $(".task_show").click(function () {
    //
    //         taskBoardModal("show");
    //     });
    //
    //     $(".task_edit").click(function () {
    //
    //         taskBoardModal("edit");
    //         taskValid();
    //     });
    // }

    function taskValid() {
        $(".taskEdit").on('click', function () {

            var title, added, description, finish_date, error, error_message, tester, project_id, user_id, create_date,
                priority, process, point, task_id;
            error = false;
            title = $("input[name='title']").val();

            description = $("textarea[name='description']").val();
            tester = $("#tester option:selected").val();
            user_id = $("#user option:selected").val();

            added = $("input[name = 'added_user' ]").attr("id");
            project_id = $("#project option:selected").val();
            finish_date = $("input[name='endDate']").val();
            priority = $("#priority option:selected").val();
            process = $("#process option:selected").text();
            point = $("input[name='point']").val();
            task_id = $(this).attr("id");

            if (title == " ") {
                error = true;
                error_message = "Title  is  empty"
            } else if (description == " ") {
                error = true;
                error_message = "Description  is  empty"
            } else if (finish_date == " ") {
                error = true;
                error_message = "Finish date  is  empty"
            } else if (point == " ") {
                error = true;
                error_message = "Finish date  is  empty"
            } else if (error == false) {
                //
                var data = {
                    "title": title,
                    "description": description,
                    "tester_id": tester,
                    "user_id": user_id,
                    "added": added,
                    "project_id": project_id,
                    "finish_date": finish_date,
                    "priority": priority,
                    "process": process,
                    "point": point
                };
                var taskUpdate = sendAjax(data, "/updateTask/" + task_id);
            }
            if (taskUpdate === "Edit Task") {
                // console.log(taskUpdate)
                $("#error_task_edit").css({"display": "block", "color": "#28cc24"}).text(taskUpdate);

            } else {
                $("#error_task_edit").css({"display": "block", "color": "#cc0400"}).text(taskUpdate);
            }

            $("#close_modal_task").off("click");
            $("#close_modal_task").click(function () {

                alert(445)
                $("#error_task_edit").text("");
                tasksList();
                taskForUser();
            })
        });

        $(".taskCreate ").on('click', function () {

            var title, added, description, createTask, finish_date, error, error_message, start_date, tester,
                project_id, user_id,
                create_date,
                priority, process, point, task_id;
            error = false;
            title = $("input[name='title']").val();
            description = $("textarea[name='description']").val();
            tester = $("#tester option:selected").val();
            user_id = $("#user option:selected").val();
            project_id = $("#project option:selected").val();
            priority = $("#priority option:selected").val();
            process = $("input[name='added_user']").val();
            finish_date = $("input[name='endDate']").val();
            start_date = $("input[name ='create_date']").val();
            point = $("input[name='point']").val();
            if (title == " ") {
                error = true;
                error_message = "Title  is  empty"

            } else if (description == " ") {
                error = true;
                error_message = "Description  is  empty"
            } else if (finish_date == " ") {
                error = true;
                error_message = "Finish date  is  empty"
            } else if (start_date == " ") {
                error = true;
                error_message = "Start date  is  empty"
            } else if (start_date > finish_date) {
                error = true;
                error_message = "Finish date  is  not correct"
            } else if (point == " ") {
                error = true;
                error_message = "Finish date  is  empty"
            }


            if (error) {


                $("#error_task_edit").css("color", "#cc0400").text(error_message)

            } else {
                var data = {
                    "title": title,
                    "description": description,
                    "tester_id": tester,
                    "user_id": user_id,
                    "added": added,
                    "project_id": project_id,
                    "finish_date": finish_date,
                    "start_date": start_date,
                    "priority": priority,
                    "process": process,
                    "point": point
                };

                createTask = sendAjax(data, "/createTask");


                if (createTask === "Create Task") {
                    $("#error_task_edit").css({"display": "block", "color": "#28cc24"}).text(createTask);

                     $("input[name='title']").val("");
                     $("textarea[name='description']").val("");
                    $("#tester option:selected").val("");
                    $("#user option:selected").val("");
                     $("#project option:selected").val("");
                     $("#priority option:selected").val("");
                    $("input[name='added_user']").val("");
                     $("input[name='endDate']").val("");
                     $("input[name ='create_date']").val("");
                    $("input[name='point']").val("");

                } else {

                    $("#error_task_edit").css({"display": "block", "color": "#cc0400"}).text(createTask);
                }


            }


            $("#close_modal_task").click(function () {

                alert(445)
                $("#error_task_edit").text("");
                tasksList();
                taskForUser();
            })
        });

    }

    // function taskModal() {
    //     // $(".task_show").click(function () {
    //     //     taskBoardModal("show");
    //     // });
    //
    //     $(".task_edit").click(function () {
    //
    //         taskBoardModal("edit");
    //         taskValid();
    //     });
    //
    // }




    function taskForUser() {

        $(".task_edit").hover(function () {
            $(this).css('cursor', 'pointer');
        });
        $(".task_edit").click(function () {

            var id = $(this).attr("id");
            var task_for_user = sendAjax(id, "/gettaskforuser");
            taskBoardModal("edit", task_for_user);
            taskValid();
            taskForUser()

        });
        $(".add_new_task").click(function () {

            var task_for_user = sendAjax("", "/gettaskforuser");
            taskBoardModal("create", task_for_user);
            taskValid()
        });

        $(".task_show").click(function () {
            var id = $(this).attr("task_id");

            var task_for_user = sendAjax(id, "/gettaskforuser");

            taskBoardModal("show", task_for_user);

        });

    }


    function deleteTask() {
        $(".delete_task").click(function () {
alert(45)
            var id = $(this).attr("id");
            var delete_task_answer = sendAjax("", "deleteTask/" + id);

            if (delete_task_answer == "Task deleted") {

                $(this).parents("tr").remove();
                // alert($("tr").length)

            } else {

                alert(delete_task_answer);
            }
        });
    }


    // function deleteTask() {
    //     $(".delete_task").on('click', function () {
    //         var id = $(this).attr("id");
    //         var del= sendAjax("", "/deletetask/" + id);
    //         if (del == "Delete Task") {
    //             $(this).parents("tr").remove();
    //         } else {
    //             alert(del);
    //
    //         }
    //     })
    // }


    function taskMsgModal() {

        var discussion_modal = '';
        discussion_modal += '<div style="display: block;" class="modal fade show" id="discussion_modal" role="dialog" style="opacity: 1;display: block">';
        discussion_modal += '<div class="modal-dialog" style="min-width: 50%;height: 50%">';
        discussion_modal += '<div class="modal-content">';

        discussion_modal += '<div class="modal-header btn-primary rounded-top">';
        discussion_modal += '<h4 class="modal-title">Your message</h4>';
        discussion_modal += '</div>';

        discussion_modal += '<div class="modal-body">';
        discussion_modal += '<div class="form-group row">';
        discussion_modal += '<label style="margin-left: 10px" for="task_message">Message</label>';
        discussion_modal += '<div class="col-md-10">';
        discussion_modal += '<textarea class="form-control task_message" style="height: auto!important; resize: none;" id="task_message" rows="4" name="task_message"></textarea>';
        discussion_modal += '</div>';
        discussion_modal += '<div class="col-md-12 text-center">';
        discussion_modal += '<button class="save_task_message btn btn-success" style="margin-top: 15px">Save</button>';
        discussion_modal += '</div>';
        discussion_modal += '</div>';
        discussion_modal += '</div>';
        discussion_modal += '<div class="modal-footer">';
        discussion_modal += '<div class="task_message_error" style="width: 568px;color: red"></div>';
        discussion_modal += '<button type="button" class="btn btn-default close_discussion_modal btn btn-danger " data-dismiss="modal">Close</button>';
        discussion_modal += '</div>';
        discussion_modal += '</div>';
        discussion_modal += '</div>';
        discussion_modal += '</div>';
        discussion_modal += '</div>';

        $(".for_modal").empty().append(discussion_modal);
    }

    function taskMove(role) {

        var drag_from;
        var move_task_id;
        var from_position;
        var for_tester = false;
        var from_discussion = false;
        var task_user_id;
        var task;
        var tester_id;
        var to_position;

        $('.items').off("dragstart");
        $('.items').bind('dragstart', function (event) {

            for_tester = false;
            from_discussion = false;
            from_position = $(this).parent(".lolo").attr("id");
            move_task_id = $(this).attr("task_id");
            task_user_id = $(this).attr("user_id");
            tester_id = $(this).attr("tester_id");
            task = $(this);

            if ($(this).find(".task_for_test").length > 0) {

                for_tester = true;
            }

            if ($(this).find(".task_for_discussion").length > 0) {

                from_discussion = true;
            }

            drag_from = $(this).parents(".panel").attr("id");

            event.originalEvent.dataTransfer.setData("text/plain", event.target.getAttribute('id'));
        });

        $('.board').off("dragover");
        $('.board').bind('dragover', function (event) {

            event.preventDefault();
        });


        $('.board').off("dragenter");
        $('.board').bind('dragenter', function (event) {

            $(this).addClass("over");
        });

        $('.board').off("dragleave drop");
        $('.board').bind('dragleave drop', function (event) {

            $(this).removeClass("over");
        });

        $('.item').off("drop");
        $('.items').bind('drop', function (event) {

            return false;
        });

        $('.board').off("drop");
        $('.board').bind('drop', function (event) {

            var drag_to = $(this).parents(".panel").attr("id");
            var data = {"task_position": $(this).attr("id")};
            to_position = $(this).attr("id");
            if (role.roles[0].name == "Admin" || role.roles[0].name == "Task manager") {

                if ($(this).attr("id") == "Discussion" || $(this).attr("id") == "Finish") {
                    // task_move = false;
                    if(from_position != "Finish"){

                        taskMsgModal();
                    }

                    $(".close_discussion_modal").click(function () {

                        $("#discussion_modal").css({"opacity": 0, "display": "none"})
                    });
                }

                task_move = true;

            } else if (from_position == "Test" && $(this).attr("id") == "Discussion" && role.roles[0].name != "User") {  //&& for_tester

                taskMsgModal();
                var pi = 0;
                if(role.id == tester_id && role.roles[0].name == "User"){

                    task.hide();
                }


                $(".close_discussion_modal").click(function () {

                    $("#discussion_modal").css({"opacity": 0, "display": "none"})
                });

                task_move = true;

            } else if (from_position == "Test" && $(this).attr("id") == "Finish" && role.roles[0].name != "User") {  //&& for_tester
                taskMsgModal();
                var pi = 0;
                if(role.id == tester_id && role.roles[0].name == "User"){

                    task.hide();
                }


                $(".close_discussion_modal").click(function () {

                    $("#discussion_modal").css({"opacity": 0, "display": "none"})
                });
                task_move = true;
            }

            else if (drag_from == drag_to && drag_to == role.id) {

                var task_move = false;

                if ($(this).attr("id") !== "Finish" && $(this).attr("id") !== "Discussion" && (from_position == "Tasks" || from_position == "In_Process")) {
                    if($(this).attr("id") == "Finish"){
                        task_move = false;
                    }else{task_move = true;
                        if($(this).attr("id") == "Test"){
                            if(for_tester){
                                task_move = false;
                            }
                            //task.hide();
                        }}

                } else if (from_discussion && $(this).attr("id") == "Finish") {
                    taskMsgModal();
                    task_move = true;
                    //task.remove();
                }

                if(for_tester && ($(this).attr("id") == "Discussion" || $(this).attr("id") == "Finish")){
                    taskMsgModal();
                    task_move = true;
                }

                $(".close_discussion_modal").click(function () {

                    $("#discussion_modal").css({"opacity": 0, "display": "none"})
                });
            }
            if (from_position == "Finish") {

                task_move = false;
            }

            if($(this).attr("id") == "image_user"){

                task_move = false;
            }

            if (task_move) {

                if($(this).attr("id") == "Tasks" || $(this).attr("id")  == "In_Process"){
                    if(!for_tester){

                        $("#item"+move_task_id+"task_for_test").remove();
                    }else{
                        if(from_position == "Discussion"){



                            if(drag_from != drag_to){

                                task.attr("tester_id",drag_to);
                                data.change_tester = drag_to;
                            }

                            var task_in_test = $("#"+task.attr("user_id")).find("#item"+task.attr("task_id"));
                            $("#"+task.attr("user_id")).find("#Test").append(task_in_test);
                            data.task_position_for_tester = data.task_position;
                            data.task_position = "Test";

                        }


                    }

                }else if(!for_tester && to_position == "Test"){

                    if($("#"+task.attr("tester_id")).find("#Discussion").find("#item"+move_task_id+"task_for_test").length > 0){

                        $("#"+task.attr("tester_id")).find("#Discussion").find("#item"+move_task_id+"task_for_test").remove();
                    }

                    if(drag_from != drag_to){

                        var t_id = task.attr("id") + "task_for_test";
                        //$("#"+tester_id).find("#Tasks").append(task.clone().attr("id",t_id).css("background-color","#ccf2ff").append("<p class='task_for_test'>For tester</p>"));
                    }

                }

                if ($(this).attr("id") == "Finish") {

                    var task_end = 1
                } else {
                    task_end = 0;
                }

                var listitem = event.originalEvent.dataTransfer.getData("text/plain");

                if (from_position == "Test" && $(this).attr("id") == "Discussion" && for_tester) {

                    $(".save_task_message").off("click");
                    $(".save_task_message").click(function () {
                        var task_message, task_message_error = true, task_message_error_message,
                            set_task_message_answer;
                        task_message = $("#task_message").val();

                        if (task_message == "") {

                            task_message_error_message = "Please set message for this task";
                        } else {

                            task_message_error = false;
                        }

                        if (task_message_error) {

                            $(".task_message_error").text(task_message_error_message);
                        } else {

                            var dataa = {"task_message": task_message};
                            set_task_message_answer = sendAjax(dataa, "/settaskmessage/" + move_task_id);

                            if ("Succies" == set_task_message_answer) {
                                $("#discussion_modal").css({"opacity": 0, "display": "none"});
                                event.target.appendChild(document.getElementById(listitem));
                                event.preventDefault();

                                //taskMovePosition(drag_from, drag_to, data, move_task_id, task_end);
                                // task.remove();
                                setHeight(drag_from);
                                //task.hide();
                                //var task_move_update_answer = sendAjax(data, "/taskmoveupdate/" + move_task_id);
                                $("#"+task_user_id).find("#Finish").append(task);
                                setHeight(task_user_id);
                            } else {

                                alert(set_task_message_answer)
                            }

                        }
                    });

                } else if ($(this).attr("id") == "Discussion" || $(this).attr("id") == "Test" && (role.roles[0].name == "Admin" || role.roles[0].name == "Task manager")) {

                    if($(this).attr("id") == "Test"){

                        if(for_tester && role.roles[0].name != "User"){

                        }else{
                            if(drag_from != drag_to){
                                if(for_tester){
                                    task.attr("tester_id",drag_to);

                                }

                                event.target.appendChild(document.getElementById(listitem));
                                event.preventDefault();
                            }else{
                                if($("#"+tester_id).length > 0){

                                    //$("#"+tester_id).find("#Test").append(task);
                                    event.target.appendChild(document.getElementById(listitem));
                                    event.preventDefault();
                                    if($(this).attr("id") == "Test"){

                                        var t_id  = task.attr("id");
                                        t_id = t_id + "task_for_test";
                                        $("#"+tester_id).find("#Tasks").append(task.clone().attr("id",t_id).addClass("cloneTask").append("<p class='task_for_test'></p>"));
                                    }else{

                                        //$("#"+tester_id).find("#"+$(this).attr("id")).append(task.clone().append("<p class='task_for_test'>For tester</p>"));
                                    }

                                    taskMove(role);
                                }else{
                                    event.target.appendChild(document.getElementById(listitem));
                                    event.preventDefault();
                                    // task.hide();
                                }
                            }

                            taskMovePosition(drag_from, drag_to, data, move_task_id, task_end, $(this).attr("id"),for_tester);

                            // $(".task_for_test").empty();
                            //task.find(".task_description").append("<p class='task_for_test'>Task for test</p>");

                            setHeight(drag_from);
                            setHeight(tester_id);
                        }


                    }else{


                        $(".save_task_message").off("click");
                        $(".save_task_message").click(function () {

                            var task_message, task_message_error = true, task_message_error_message,
                                set_task_message_answer;
                            task_message = $("#task_message").val();

                            if (task_message == "") {

                                task_message_error_message = "Please set message for this task";
                            } else {

                                task_message_error = false;
                            }

                            if (task_message_error) {

                                $(".task_message_error").text(task_message_error_message);
                            } else {

                                var dataa = {"task_message": task_message};
                                set_task_message_answer = sendAjax(dataa, "/settaskmessage/" + move_task_id);

                                if ("Succies" == set_task_message_answer) {


                                    if(!for_tester){

                                        var t_id  = task.attr("id")+"task_for_test";



                                        //$("#"+tester_id).find('[task_id="'+ move_task_id +'"]').remove();
                                        $("#"+tester_id).find('#item'+move_task_id+"task_for_test").remove();
                                        $("#"+tester_id).find("#"+to_position).append(task.clone().attr("id",t_id).addClass("cloneTask").append("<p class='task_for_test'></p>"));
                                    }else{

                                        var tt = $("#"+task_user_id).find('#item'+move_task_id);
                                        // $("#"+task_user_id).find('[task_id="'+ move_task_id +'"]').remove();
                                        $("#"+task_user_id).find('#item'+move_task_id).remove();
                                        $("#"+task_user_id).find("#"+to_position).append(tt);


                                    }

                                    taskMove(role);

                                    $("#discussion_modal").css({"opacity": 0, "display": "none"});
                                    event.target.appendChild(document.getElementById(listitem));
                                    event.preventDefault();

                                    taskMovePosition(drag_from, drag_to, data, move_task_id, task_end,to_position,for_tester);

                                    if (drag_from != task_user_id) {

                                        // $("#"+task_user_id).find("#Discussion").append(task);
                                        // setHeight(tester_id);
                                        // task.remove();
                                    }

                                    setHeight(drag_from);
                                    setHeight(tester_id);
                                    setHeight(task_user_id);

                                } else {

                                    alert(set_task_message_answer)
                                }

                            }
                        });
                    }

                }
                else if (from_position == "Discussion") {

                    if($(this).attr("id") == "Finish"){

                        $(".save_task_message").click(function () {

                            var task_message, task_message_error = true, task_message_error_message,
                                set_task_message_answer;
                            task_message = $("#task_message").val();

                            if (task_message == "") {

                                task_message_error_message = "Please set message for this task";
                            } else {

                                task_message_error = false;
                            }

                            if (task_message_error) {

                                $(".task_message_error").text(task_message_error_message);
                            } else {

                                var dataa = {"task_message": task_message,"finish":1};

                                var set_task_message_answer = sendAjax(dataa, "/settaskmessage/" + move_task_id);

                                if ("Succies" == set_task_message_answer) {


                                    if(!for_tester){

                                        var t_id  = task.attr("id")+"task_for_test";
                                        // var t_id  = "item10";


                                        $("#"+tester_id).find('#item'+move_task_id+"task_for_test").remove();

                                        $("#"+tester_id).find("#"+to_position).append(task.clone().attr("id",t_id).addClass("cloneTask").append("<p class='task_for_test'></p>"));
                                    }else{

                                        // var tt = $("#"+task_user_id).find('[task_id="'+ move_task_id +'"]');
                                        var tt = $("#"+task_user_id).find('#item'+move_task_id);

                                        $("#"+task_user_id).find('#item'+move_task_id).remove();
                                        $("#"+task_user_id).find("#"+to_position).append(tt);


                                    }

                                    $("#discussion_modal").css({"opacity": 0, "display": "none"});
                                    event.target.appendChild(document.getElementById(listitem));
                                    event.preventDefault();
                                    taskMovePosition(drag_from, drag_to, data, move_task_id, task_end);

                                    // if (drag_from != task_user_id) {
                                    //
                                    //     $("#"+task_user_id).find("#Discussion").append(task);
                                    //     // setHeight(tester_id);
                                    //     // task.remove();
                                    // }
                                    setHeight(drag_from);
                                    setHeight(task_user_id);

                                } else {

                                    // alert(set_task_message_answer)
                                }

                            }
                        });
                    }else{

                        var attr_id = task.attr("task_id");
                        $('[task_id =' + attr_id + ']').each(function () {

                            if ($(this).find(".task_for_discussion").length > 0) {

                                $(this).remove();
                            }
                        });
                        event.target.appendChild(document.getElementById(listitem));
                        event.preventDefault();

                        taskMovePosition(drag_from, drag_to, data, move_task_id, task_end, $(this).attr("id"));
                        setHeight(drag_from);
                        setHeight(drag_to);
                        setHeight(task_user_id);
                    }



                }
                else {

                    if ($(this).attr("id") == "Finish") {

                        // $(".save_task_message").off("click");

                        $(".save_task_message").click(function () {

                            var task_message, task_message_error = true, task_message_error_message,
                                set_task_message_answer;
                            task_message = $("#task_message").val();

                            if (task_message == "") {

                                task_message_error_message = "Please set message for this task";
                            } else {

                                task_message_error = false;
                            }

                            if (task_message_error) {

                                $(".task_message_error").text(task_message_error_message);
                            } else {

                                var dataa = {"task_message": task_message,"finish":1};

                                var set_task_message_answer = sendAjax(dataa, "/settaskmessage/" + move_task_id);

                                if ("Succies" == set_task_message_answer) {

                                    if(!for_tester){

                                        var t_id  = task.attr("id")+"task_for_test";
                                        // var t_id  = "item10";
                                        $("#"+tester_id).find('#item'+move_task_id+"task_for_test").remove();

                                        // $("#"+tester_id).find('[task_id="'+ move_task_id +'"]').remove();
                                        $("#"+tester_id).find("#"+to_position).append(task.clone().attr("id",t_id).addClass("cloneTask").append("<p class='task_for_test'></p>"));
                                    }else{

                                        // var tt = $("#"+task_user_id).find('[task_id="'+ move_task_id +'"]');
                                        var tt = $("#"+task_user_id).find('#item'+move_task_id);


                                        $("#"+task_user_id).find('[task_id="'+ move_task_id +'"]').remove();
                                        $("#"+task_user_id).find("#"+to_position).append(tt);


                                    }

                                    $("#discussion_modal").css({"opacity": 0, "display": "none"});
                                    event.target.appendChild(document.getElementById(listitem));
                                    event.preventDefault();
                                    var set_task_message_answer = taskMovePosition(drag_from, drag_to, data, move_task_id, task_end);

                                    setHeight(drag_from);
                                    setHeight(tester_id);


                                } else {

                                    alert(set_task_message_answer)
                                }

                            }
                        });

                    } else {

                        if(for_tester && drag_from != drag_to){

                            task.attr("tester_id",drag_to);
                            $("#"+task_user_id).find("#item"+task.attr("task_id")).attr("tester_id",drag_to)

                        }

                        event.target.appendChild(document.getElementById(listitem));
                        event.preventDefault();
                        taskMovePosition(drag_from, drag_to, data, move_task_id, task_end, $(this).attr("id"),for_tester);

                        setHeight(drag_from);
                        setHeight(drag_to);
                    }


                }


            }
        });
    }


    function setHeight(drag_to) {

        $("#" + drag_to).find(".lolo").each(function () {

            $(this).css("height", "auto");
        });
        var t = 0;
        var t_elem;
        $("#" + drag_to).find(".lolo").each(function () {

            $this = $(this);
            if ($this.outerHeight() > t) {

                t_elem = this;
                t = $this.outerHeight();
            }
        });

        $("#" + drag_to).find(".lolo").each(function () {

            if(t + 25 == 35){

                t = 120;
            }

            $(this).css("height", t + 25);
        });
    }


    function taskMovePosition(drag_from, drag_to, data, move_task_id, task_end, task_position,for_tester) {




        if(for_tester){

            if(drag_from != drag_to){

                // if(task_position == "Discussion" || task_position == "Finish"){
                //
                // }

                data.change_tester = drag_to;
            }
            data.task_position_for_tester = true;
        }else{

        }

        if(task_position == "Test"){

            data.task_move_test = true;
        }

        if (drag_from != drag_to) {

            if (task_position == "Test") {

                data.tester_id = drag_to;

                //taskMovePosition(drag_from, drag_to, data, move_task_id, task_end, $(this).attr("id"));
            }
            if(!for_tester){
                data.user_id = drag_to
            }

        }

        if ($(this).attr("id") == "Finish") {

            data.end_task = task_end;
        } else {

            data.end_task = task_end;
        }

        var task_move_update_answer = sendAjax(data, "/taskmoveupdate/" + move_task_id);
        console.log(task_move_update_answer)

    }


    // board();
var x;

    function allFunc() {

        projectValidation();
        usersList();
        projects();
        tasks();
        //
        // taskMove();
        // taskModal();
        taskForUser();
        // deleteTask();
        teamsList();
    }

    // projectValidation();
    // usersList();
    // projects();
    // tasks();
    //
    // // taskMove();
    // // taskModal();
    // taskForUser();
    // deleteTask();
    // teamsList();



    // document.location.reload(
    //
    //
    //
    // );

    dashBoard();
    var page_value = localStorage.getItem("page");

    if (page_value == 1) {

        tasksList();
        taskForUser();
        // deleteTask();

        allFunc();
    } else if (page_value == 2) {

        projectList();
        newProjectModal();
        delteProject();
        updateProject();

        allFunc();
    } else if (page_value == 3) {
        dashBoard();
        $(".for_modal").empty();
        x =  setInterval(function () {dashBoard()  },10000)
        // taskBoardModal();
        // taskMove();
    } else if (page_value == 4) {

        userList();
        updateUser();
        deleteUser();

        allFunc();
    } else if (page_value == 5) {

        // dashBoard();
        teamListTable();
        updateTeam();
        deleteTeam();

        allFunc();
    }else{
        dashBoard();
        x =  setInterval(function () {dashBoard()  },10000);
    }

});