<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" href="../../favicon.ico">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Dashboard Template for Bootstrap</title>
    <link rel="canonical" href="https://getbootstrap.com/docs/4.0/examples/dashboard/">

    <!-- Bootstrap core CSS -->
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.10/css/all.css"
          integrity="sha384-+d0P83n9kaQMCwj8F4RJB66tzIwOKmrdb46+porD/OvrJ+37WqIM7UoBtwHO6Nlg" crossorigin="anonymous">
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
    <script src="https://code.jquery.com/ui/1.11.4/jquery-ui.min.js"></script>
    <!-- Custom styles for this template -->
    <link href="css/dashboard.css" rel="stylesheet">
    <script type="text/javascript" src="{{ URL::asset('js/script.js') }}"></script>


    <link rel="stylesheet" href="{{ URL::asset('css/style.css') }}"/>
    <link rel="stylesheet" href="{{ URL::asset('css/jquery.datetimepicker.css') }}"/>
    {{--<link href="//netdna.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">--}}
    {{--<link rel="stylesheet" href="{{ URL::asset('css/style.css') }}"/>--}}
    {{--<link rel='stylesheet prefetch' href='https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.1.1/animate.min.css'>--}}


    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.21.0/moment.min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/tempusdominus-bootstrap-4/5.0.0-alpha18/js/tempusdominus-bootstrap-4.min.js"></script>


</head>

<body>
<div class="wrapper">
    <header>
        <nav class="navbar navbar-toggleable-md navbar-inverse fixed-top bg-inverse">
            <button class="navbar-toggler navbar-toggler-right hidden-lg-up" type="button" data-toggle="collapse"
                    data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false"
                    aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <a class="navbar-brand" href="#"><img class="logo" src="image/genericlrg.png"></a>

            <div class="collapse navbar-collapse" id="navbarsExampleDefault">

                <ul class="navbar-nav ml-auto">

                    <li class=" nav-item dropdown">
                        <a id="navbarDropdown" class="nav-link dropdown-toggle user_name" href="#" role="button"
                           data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
                            {{ Auth::user()->name }} <span class="caret"></span>
                        </a>

                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <div>
                                <a href="#" data-activates="slide-out" class="button-collapse black-text"></a>
                            </div>
                            <button class="dropdown-item go_user_page" >

                                My Page
                            </button>
                            <a class="dropdown-item user_logout" href="{{ route('logout') }}"
                               onclick="event.preventDefault();
    document.getElementById('logout-form').submit();">
                                {{ __('Logout') }}
                            </a>
                            <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                @csrf
                            </form>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    </header>


    <aside >
        <nav class="main-menu">
            <ul>
                <li>
                    <a class="nav-link users_list menu_link" href="#" data-toggle="modal" data-target="#fsModal">
                        <i class="fa fa-home fa-2x"></i>
                        <span class="nav-text">
                           Users

                        </span>
                    </a>

                </li>
                <li class="has-subnav">
                    <a class="nav-link projects menu_link" href="#">
                        <i class="fa fa-laptop fa-2x"></i>
                        <span class="nav-text">
                        Projects
                        </span>
                    </a>

                </li>
                <li class="has-subnav">
                    <a class="nav-link tasks menu_link" href="#">
                        <i class="fa fa-list fa-2x"></i>
                        <span class="nav-text">
                            Tasks
                        </span>
                    </a>

                </li>
                <li class="has-subnav">
                    <a class="nav-link dashboard menu_link" href="#">
                        <i class="fa fa-folder-open fa-2x"></i>
                        <span class="nav-text">
                            Dashboard
                        </span>
                    </a>

                </li>

                <li>
                    <a class="nav-link teams menu_link" href="#">
                        <i class="fa fa-font fa-2x"></i>
                        <span class="nav-text">
                           Teams
                        </span>
                    </a>
                </li>


            </ul>


        </nav>
    </aside>

    <section class="col-md-11 n offset-md-1 mainBlog">
        @yield('content')
    </section>

</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js"></script>
<script src="{{URL::asset('js/jquery.datetimepicker.full.js')}}"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js"></script>

</body>
</html>