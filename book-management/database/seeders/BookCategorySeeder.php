<?php

namespace Database\Seeders;
use Illuminate\Database\Seeder;
use App\Models\BookCategory;

class BookCategorySeeder extends Seeder
{
    public function run()
    {
        $categories = ['Fiction','Non-Fiction','Science','Technology','History'];
        foreach ($categories as $name) {
            BookCategory::create(['name' => $name]);
        }
    }
}
