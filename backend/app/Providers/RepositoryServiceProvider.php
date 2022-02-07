<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Repositories\Eloquent\BaseRepository;
use App\Repositories\EloquentRepositoryInterface;

use App\Repositories\UsersRepositoryInterface;
use App\Repositories\Eloquent\UsersRepository;
use App\Repositories\ArticlesRepositoryInterface;
use App\Repositories\Eloquent\ArticlesRepository;
use App\Repositories\TagsRepositoryInterface;
use App\Repositories\Eloquent\TagsRepository;
use App\Repositories\CategoriesRepositoryInterface;
use App\Repositories\Eloquent\CategoriesRepository;
use App\Repositories\CommentsRepositoryInterface;
use App\Repositories\Eloquent\CommentsRepository;
use App\Repositories\FilesRepositoryInterface;
use App\Repositories\Eloquent\FilesRepository;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        $this->app->bind(EloquentRepositoryInterface::class, BaseRepository::class);

        $this->app->bind(UsersRepositoryInterface::class, UsersRepository::class);

        $this->app->bind(ArticlesRepositoryInterface::class, ArticlesRepository::class);

        $this->app->bind(TagsRepositoryInterface::class, TagsRepository::class);

        $this->app->bind(CategoriesRepositoryInterface::class, CategoriesRepository::class);

        $this->app->bind(CommentsRepositoryInterface::class, CommentsRepository::class);
        $this->app->bind(FilesRepositoryInterface::class, FilesRepository::class);
    }
}

