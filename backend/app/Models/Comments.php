<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comments extends Model {
    protected static $unguarded = true;

    public function author(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Users::class, 'author');
    }

    public function article(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Articles::class, 'article');
    }

}

