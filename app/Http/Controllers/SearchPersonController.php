<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Person;

class SearchPersonController extends Controller
{
    public function searchPerson(Request $request){

    	$lat=$request->lat;
    	$lng=$request->lng;

    	$person=Person::whereBetween('lat',[$lat-0.1,$lat+0.1])->whereBetween('lng',[$lng-0.1,$lng+0.1])->get();

    	return $person;
    }
}
