<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Migration1644237826868 extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

                Schema::create('users', function (Blueprint $table) {
                    $table->id();
                    $table->unsignedBigInteger('created_by_user')->nullable();
                    $table->unsignedBigInteger('updated_by_user')->nullable();
                    $table->timestamps();
                });

                Schema::create('articles', function (Blueprint $table) {
                    $table->id();
                    $table->unsignedBigInteger('created_by_user')->nullable();
                    $table->unsignedBigInteger('updated_by_user')->nullable();
                    $table->timestamps();
                });

                    Schema::table('articles', function(Blueprint $table) {
                        $table->foreign('created_by_user')->references('id')->on('users');
                        $table->foreign('updated_by_user')->references('id')->on('users');
                    });

                Schema::create('tags', function (Blueprint $table) {
                    $table->id();
                    $table->unsignedBigInteger('created_by_user')->nullable();
                    $table->unsignedBigInteger('updated_by_user')->nullable();
                    $table->timestamps();
                });

                    Schema::table('tags', function(Blueprint $table) {
                        $table->foreign('created_by_user')->references('id')->on('users');
                        $table->foreign('updated_by_user')->references('id')->on('users');
                    });

                Schema::create('categories', function (Blueprint $table) {
                    $table->id();
                    $table->unsignedBigInteger('created_by_user')->nullable();
                    $table->unsignedBigInteger('updated_by_user')->nullable();
                    $table->timestamps();
                });

                    Schema::table('categories', function(Blueprint $table) {
                        $table->foreign('created_by_user')->references('id')->on('users');
                        $table->foreign('updated_by_user')->references('id')->on('users');
                    });

                Schema::create('comments', function (Blueprint $table) {
                    $table->id();
                    $table->unsignedBigInteger('created_by_user')->nullable();
                    $table->unsignedBigInteger('updated_by_user')->nullable();
                    $table->timestamps();
                });

                    Schema::table('comments', function(Blueprint $table) {
                        $table->foreign('created_by_user')->references('id')->on('users');
                        $table->foreign('updated_by_user')->references('id')->on('users');
                    });

                Schema::table('users', function (Blueprint $table) {
                    $table->string('firstName')->nullable();

                });

                Schema::table('users', function (Blueprint $table) {
                    $table->string('lastName')->nullable();

                });

                Schema::table('users', function (Blueprint $table) {
                    $table->string('phoneNumber')->nullable();

                });

                Schema::table('users', function (Blueprint $table) {
                    $table->string('email')->nullable();

                });

                Schema::table('users', function (Blueprint $table) {
                    $table->enum('role', ['admin','user'])->nullable();

                });

                Schema::table('users', function (Blueprint $table) {
                    $table->boolean('disabled')->nullable();

                });

                Schema::table('users', function (Blueprint $table) {
                    $table->string('password')->nullable();

                });

                Schema::table('users', function (Blueprint $table) {
                    $table->boolean('emailVerified')->nullable();

                });

                Schema::table('users', function (Blueprint $table) {
                    $table->string('emailVerificationToken')->nullable();

                });

                Schema::table('users', function (Blueprint $table) {
                    $table->timestamp('emailVerificationTokenExpiresAt')->nullable();

                });

                Schema::table('users', function (Blueprint $table) {
                    $table->string('passwordResetToken')->nullable();

                });

                Schema::table('users', function (Blueprint $table) {
                    $table->timestamp('passwordResetTokenExpiresAt')->nullable();

                });

                Schema::table('users', function (Blueprint $table) {
                    $table->string('provider')->nullable();

                });

                Schema::table('articles', function (Blueprint $table) {
                    $table->string('title')->nullable();

                });

                Schema::table('articles', function (Blueprint $table) {
                    $table->string('body')->nullable();

                });

                Schema::table('articles', function (Blueprint $table) {
                    $table->unsignedBigInteger('author')->nullable();

                    $table->foreign('author')->references('id')->on('users');

                });

                Schema::table('articles', function (Blueprint $table) {
                    $table->unsignedBigInteger('category')->nullable();

                    $table->foreign('category')->references('id')->on('categories');

                });

                Schema::table('articles', function (Blueprint $table) {
                    $table->boolean('featured')->nullable();

                });

                Schema::table('tags', function (Blueprint $table) {
                    $table->string('name')->nullable();

                });

                Schema::table('categories', function (Blueprint $table) {
                    $table->string('name')->nullable();

                });

                Schema::table('comments', function (Blueprint $table) {
                    $table->string('text')->nullable();

                });

                Schema::table('comments', function (Blueprint $table) {
                    $table->unsignedBigInteger('author')->nullable();

                    $table->foreign('author')->references('id')->on('users');

                });

                Schema::table('comments', function (Blueprint $table) {
                    $table->unsignedBigInteger('article')->nullable();

                    $table->foreign('article')->references('id')->on('articles');

                });

                Schema::table('comments', function (Blueprint $table) {
                    $table->boolean('moderated')->nullable();

                });

    }

    /**
    * Reverse the migrations.
    *
    * @return void
    */
    public function down()
    {

                Schema::table('comments', function(Blueprint $table) {
                    $table->dropColumn('moderated');
                });

                Schema::table('comments', function(Blueprint $table) {
                    $table->dropColumn('article');
                });

                Schema::table('comments', function(Blueprint $table) {
                    $table->dropColumn('author');
                });

                Schema::table('comments', function(Blueprint $table) {
                    $table->dropColumn('text');
                });

                Schema::table('categories', function(Blueprint $table) {
                    $table->dropColumn('name');
                });

                Schema::table('tags', function(Blueprint $table) {
                    $table->dropColumn('name');
                });

                Schema::table('articles', function(Blueprint $table) {
                    $table->dropColumn('images');
                });

                Schema::table('articles', function(Blueprint $table) {
                    $table->dropColumn('featured');
                });

                Schema::table('articles', function(Blueprint $table) {
                    $table->dropColumn('tags');
                });

                Schema::table('articles', function(Blueprint $table) {
                    $table->dropColumn('category');
                });

                Schema::table('articles', function(Blueprint $table) {
                    $table->dropColumn('author');
                });

                Schema::table('articles', function(Blueprint $table) {
                    $table->dropColumn('body');
                });

                Schema::table('articles', function(Blueprint $table) {
                    $table->dropColumn('title');
                });

                Schema::table('users', function(Blueprint $table) {
                    $table->dropColumn('provider');
                });

                Schema::table('users', function(Blueprint $table) {
                    $table->dropColumn('passwordResetTokenExpiresAt');
                });

                Schema::table('users', function(Blueprint $table) {
                    $table->dropColumn('passwordResetToken');
                });

                Schema::table('users', function(Blueprint $table) {
                    $table->dropColumn('emailVerificationTokenExpiresAt');
                });

                Schema::table('users', function(Blueprint $table) {
                    $table->dropColumn('emailVerificationToken');
                });

                Schema::table('users', function(Blueprint $table) {
                    $table->dropColumn('emailVerified');
                });

                Schema::table('users', function(Blueprint $table) {
                    $table->dropColumn('password');
                });

                Schema::table('users', function(Blueprint $table) {
                    $table->dropColumn('avatar');
                });

                Schema::table('users', function(Blueprint $table) {
                    $table->dropColumn('disabled');
                });

                Schema::table('users', function(Blueprint $table) {
                    $table->dropColumn('role');
                });

                Schema::table('users', function(Blueprint $table) {
                    $table->dropColumn('email');
                });

                Schema::table('users', function(Blueprint $table) {
                    $table->dropColumn('phoneNumber');
                });

                Schema::table('users', function(Blueprint $table) {
                    $table->dropColumn('lastName');
                });

                Schema::table('users', function(Blueprint $table) {
                    $table->dropColumn('firstName');
                });

                Schema::drop('comments');

                Schema::drop('categories');

                Schema::drop('tags');

                Schema::drop('articles');

                Schema::drop('users');

    }
}
