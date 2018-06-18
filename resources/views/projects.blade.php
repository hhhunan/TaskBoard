@extends('layouts.menu')

@section('content')
<div class="container">
    <h2>Projects</h2>
    <p>The .table-hover class enables a hover state on table rows:</p>
    <table class="table table-hover">
        <thead>
        <tr>
            <th>Project title</th>
            <th>Project Description</th>

        </tr>
        </thead>
        <tbody>
        @foreach($projects as $project)
        <tr>
            <td>{{ $project->title }}</td>
            <td>{{ $project->description }}</td>
            <td><button class="btn btn-primary">Update</button></td>
            <td><button class="btn btn-danger">Delete</button></td>
        </tr>
        @endforeach
        </tbody>
    </table>
</div>
@endsection
