<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Scout\Searchable; // Import the trait

class User extends Authenticatable
{
    use Searchable; // Use the trait

    protected $fillable = [
        'name',
        'email',
        'password',
        'terms_accepted',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function toSearchableArray()
    {
        return [
            'id'    => $this->id,
            'name'  => $this->name,
            'email' => $this->email,
        ];
    }
}