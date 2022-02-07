<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddForeignKeysToTable extends Migration
{
    public function up()
    {

        Schema::table('users', function (Blueprint $table) {
            $table->foreign('created_by_user')->references('id')->on('users');
            $table->foreign('updated_by_user')->references('id')->on('users');

        });

        Schema::table('articles', function (Blueprint $table) {
            $table->foreign('created_by_user')->references('id')->on('users');
            $table->foreign('updated_by_user')->references('id')->on('users');

            $table->unsignedBigInteger('author')->nullable();
            $table->foreign('author')->references('id')->on('users');

            $table->unsignedBigInteger('category')->nullable();
            $table->foreign('category')->references('id')->on('categories');

        });

        Schema::create('articles_tags_tags', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedBigInteger('articles_id')->unsigned();
            $table->unsignedBigInteger('tags_id')->unsigned();
            $table->foreign('articles_id')->references('id')->on('articles');
            $table->foreign('tags_id')->references('id')->on('tags');
        });

        Schema::table('tags', function (Blueprint $table) {
            $table->foreign('created_by_user')->references('id')->on('users');
            $table->foreign('updated_by_user')->references('id')->on('users');

        });

        Schema::table('categories', function (Blueprint $table) {
            $table->foreign('created_by_user')->references('id')->on('users');
            $table->foreign('updated_by_user')->references('id')->on('users');

        });

        Schema::table('comments', function (Blueprint $table) {
            $table->foreign('created_by_user')->references('id')->on('users');
            $table->foreign('updated_by_user')->references('id')->on('users');

            $table->unsignedBigInteger('author')->nullable();
            $table->foreign('author')->references('id')->on('users');

            $table->unsignedBigInteger('article')->nullable();
            $table->foreign('article')->references('id')->on('articles');

        });

        Schema::table('files', function(Blueprint $table) {
            $table->foreign('created_by_user')->references('id')->on('users');
            $table->foreign('updated_by_user')->references('id')->on('users');
        });
    }

    public function down()
    {
        //
    }
}
