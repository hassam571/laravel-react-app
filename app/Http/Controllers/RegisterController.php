<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class RegisterController extends Controller
{



    public function index()
    {
        return response()->json(User::all());
    }


    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return response()->json([
            'message' => 'User deleted successfully'
        ]);
    }

    public function update(Request $request, $id)
    {
        // Validate the request data.
        $validator = Validator::make($request->all(), [
            'name'  => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email,' . $id,
            // Password is optional during update.
            'password' => 'nullable|string|min:6|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422);
        }

        // Retrieve the user by ID.
        $user = User::findOrFail($id);

        // Update the user data.
        $user->name = $request->name;
        $user->email = $request->email;
        // Update password only if provided.
        if ($request->filled('password')) {
            $user->password = Hash::make($request->password);
        }

        // Save the updated user.
        $user->save();

        return response()->json([
            'message' => 'User updated successfully!',
            'user'    => $user,
        ]);
    }



    public function search(Request $request)
    {
        $query = $request->input('query');
        $results = User::search($query)->get();
        return response()->json($results);
    }



    public function store(Request $request)
    {
        // Validate the form data
        $validator = Validator::make($request->all(), [
            'name'                  => 'required|string|max:255',
            'email'                 => 'required|email|max:255|unique:users',
            'password'              => 'required|string|min:6|confirmed',
            'terms'                 => 'accepted',
        ]);

        // Return validation errors as JSON if any
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422);
        }

        // Create the user
        $user = User::create([
            'name'           => $request->name,
            'email'          => $request->email,
            'password'       => Hash::make($request->password),
            // If you have a boolean field in your users table for terms:
            // 'terms_accepted' => true,
        ]);

        // Return a success message
        return response()->json([
            'message' => 'User registered successfully',
            'user'    => $user,
        ], 201);
    }
}
