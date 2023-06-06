<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Subscription;

class SubscriptionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        
        Subscription::create(
            [
               'subscriber_text' => 'subscription',
               'subscription_amount' => 200.0,
               'subscriber_name' => 'John Wanene'
            ]);
    }
}
