<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class HouseworkCategoriesTableSeeder extends Seeder
{
    public function run(): void
    {
        $tableName = 'mst_housework_categories';
        $csvFilePath = 'database/csv/mst_housework_categories.csv';

        // Read the CSV file
        $csvData = array_map('str_getcsv', file($csvFilePath));
        // Get the header (column names) from the first row
        $headers = array_shift($csvData);

        // Prepare data for insertion
        $dataToInsert = [];
        foreach ($csvData as $row) {
            // Convert "null" strings to actual null values
            $row = array_map(function ($value) {
                return strtolower($value) === 'null' ? null : $value;
            }, $row);

            $dataToInsert[] = array_combine($headers, $row);
        }
        // Disable foreign key checks
        DB::statement('SET foreign_key_checks = 0');

        // Truncate the table
        DB::table($tableName)->truncate();

        // Enable foreign key checks
        DB::statement('SET foreign_key_checks = 1');
        // Insert data into the mst_houseworks table
        DB::table($tableName)->insert($dataToInsert);
    }
}
