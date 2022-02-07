<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Articles extends Model {
    protected static $unguarded = true;

    public function author(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Users::class, 'author');
    }

    public function category(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Categories::class, 'category');
    }

    public function tags(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(Tags::class, 
        'articles_tags_tags', 'articles_id', 'tags_id');
    }

    public function images()
    {
        return $this->morphMany(Files::class, 'belongsTo')->where('belongsTo_column', '=', 'images');
    }
}

