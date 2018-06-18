
@extends('layouts.menu')

@section('content')
    <link rel="stylesheet" href="{{ URL::asset('css/style-default.css') }}" />
    {{--<script type="text/javascript" src="{{ URL::asset('js/script.js') }}"></script>--}}
    1<div class="container login_block">
    <div class="row justify-content-center">
        <div class="col-md-5">
            <div class="card">
                <div class="card-header"><h4>{{ __('Login') }}</h4></div>

                <div class="card-body">
                    <form method="POST" action="{{ route('login') }}">
                        @csrf

                        <div class="form-group row">
                            {{--<label for="email" class="col-sm-4 col-form-label text-md-right">{{ __('E-Mail Address') }}</label>--}}

                            <div class="col-md-12">
                                <input  type="email" placeholder="Log In" class="form-control{{ $errors->has('email') ? ' is-invalid' : '' }} form_input" name="email" value="{{ old('email') }}" required autofocus>

                                @if ($errors->has('email'))
                                    <span class="invalid-feedback">
                                        <strong>{{ $errors->first('email') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>

                        <div class="form-group row">
                            {{--<label for="password" class="col-md-4 col-form-label text-md-right">{{ __('Password') }}</label>--}}

                            <div class="col-md-12">
                                <input  type="password" placeholder="Password" class="form-control{{ $errors->has('password') ? ' is-invalid' : '' }} form_input" name="password" required>

                                @if ($errors->has('password'))
                                    <span class="invalid-feedback">
                                        <strong>{{ $errors->first('password') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>

                        <div class="form-group row">
                            <div class="col-md-12">
                                <div class="checkbox">

                                        {{--<a class="btn btn-link " href="{{ route('password.request') }}">--}}
                                            {{--{{ __('Forgot  Password?') }}--}}
                                        {{--</a>--}}
                                </div>
                            </div>
                        </div>

                        <div class="form-group row mb-0">
                            <div class="col-md-12 ">
                                <button type="submit" class="btn btn-danger login_group_button login_board">
                                    {{ __('Login') }}
                                </button>


                           <a class="btn btn-primary forgot_button" href="{{ route('register') }}">{{ __('Register') }}</a>

                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
