<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Subscription;

class SubscriptionController extends Controller
{
    public function index(){
         $subscriptions=Subscription::get()->toJson(JSON_PRETTY_PRINT);
         return response($subscriptions,200);
    }

    public function show($id=null){
       $subscription = Subscription::where('id',$id) -> first();

       if($subscription){
           $subscription = $subscription->toJson(JSON_PRETTY_PRINT);
           return response($subscription,200);
       }

       else{
           return response()->json([
               "message"=>"subscription not found"
           ],404);
       }
    }
}
