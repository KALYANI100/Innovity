import 'package:flutter/material.dart';
import '../constants/colors.dart';
import '../widgets/custom_widgets.dart';

class RegistrationScreen extends StatefulWidget {
  const RegistrationScreen({Key? key}) : super(key: key);

  @override
  _RegistrationScreenState createState() => _RegistrationScreenState();
}

class _RegistrationScreenState extends State<RegistrationScreen> {
  final _formKey = GlobalKey<FormState>();
  final _nameController = TextEditingController();
  final _emailController = TextEditingController();
  final _ageController = TextEditingController();
  final _passwordController = TextEditingController();
  final _confirmPasswordController = TextEditingController();

  @override
  void dispose() {
    _nameController.dispose();
    _emailController.dispose();
    _ageController.dispose();
    _passwordController.dispose();
    _confirmPasswordController.dispose();
    super.dispose();
  }
void _navigateToLogin() {
  Navigator.pushReplacementNamed(context, '/login'); // Real navigation
}


void _registerUser() {
  if (_formKey.currentState!.validate()) {
    // In a real app, you would handle the registration logic here
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Registration successful!'),
        backgroundColor: AppColors.primaryGreen,
      ),
    );
    
    // Navigate to the home screen or another appropriate screen
    // Navigator.pushReplacement(...);
  }
}



// void _navigateToLogin() {
//   // You would create a LoginScreen and navigate to it
//   // For now, show a snackbar to indicate functionality
//   ScaffoldMessenger.of(context).showSnackBar(
//     const SnackBar(
//       content: Text('Login feature would open here'),
//       backgroundColor: AppColors.primaryBlue,
//     ),
//   );
// }
  // void _registerUser() {
  //   if (_formKey.currentState!.validate()) {
  //     // In a real app, you would handle the registration logic here
  //     ScaffoldMessenger.of(context).showSnackBar(
  //       const SnackBar(
  //         content: Text('Registration successful!'),
  //         backgroundColor: AppColors.primaryGreen,
  //       ),
  //     );
      
  //     // Navigate to the next screen (e.g., home screen)
  //     // Navigator.pushReplacement(...);
  //   }
  // }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.secondaryYellow,
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 24),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const SizedBox(height: 40),
              Center(
                child: Container(
  height: 120,
  width: 120,
  decoration: const BoxDecoration(
    color: AppColors.secondaryYellow,
    shape: BoxShape.circle,
  ),
  child: const Center(
    child: Icon(
      Icons.person_add,
      size: 60,
      color: Colors.white,
    ),
  ),
),
              ),
              const SizedBox(height: 24),
              const Center(
                child: Text(
                  'Create Account',
                  style: TextStyle(
                    fontSize: 24,
                    fontWeight: FontWeight.bold,
                    color: AppColors.textDark,
                  ),
                ),
              ),
              const SizedBox(height: 32),
              Form(
                key: _formKey,
                child: Column(
                  children: [
                    CustomTextField(
                      hintText: 'Enter your name',
                      controller: _nameController,
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return 'Please enter your name';
                        }
                        return null;
                      },
                    ),
                    const SizedBox(height: 16),
                    CustomTextField(
                      hintText: 'Email ID',
                      controller: _emailController,
                      keyboardType: TextInputType.emailAddress,
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return 'Please enter your email';
                        }
                        if (!value.contains('@')) {
                          return 'Please enter a valid email';
                        }
                        return null;
                      },
                    ),
                    const SizedBox(height: 16),
                    CustomTextField(
                      hintText: 'Age',
                      controller: _ageController,
                      keyboardType: TextInputType.number,
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return 'Please enter your age';
                        }
                        return null;
                      },
                    ),
                    const SizedBox(height: 16),
                    CustomTextField(
                      hintText: 'Password',
                      controller: _passwordController,
                      obscureText: true,
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return 'Please enter a password';
                        }
                        if (value.length < 6) {
                          return 'Password must be at least 6 characters';
                        }
                        return null;
                      },
                    ),
                    const SizedBox(height: 16),
                    CustomTextField(
                      hintText: 'Confirm Password',
                      controller: _confirmPasswordController,
                      obscureText: true,
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return 'Please confirm your password';
                        }
                        if (value != _passwordController.text) {
                          return 'Passwords do not match';
                        }
                        return null;
                      },
                    ),
                    const SizedBox(height: 32),
                    PrimaryButton(
                      text: 'Get Started!',
                      onPressed: _registerUser,
                      color: AppColors.primaryGreen,
                    ),
                    const SizedBox(height: 24),
                    Row(
  mainAxisAlignment: MainAxisAlignment.center,
  children: [
    const Text(
      'Already have an account? ',
      style: TextStyle(
        color: AppColors.textDark,
      ),
    ),
    GestureDetector(
      onTap: _navigateToLogin,
      child: const Text(
        'Login',
        style: TextStyle(
          color: AppColors.primaryBlue,
          fontWeight: FontWeight.bold,
        ),
      ),
    ),
  ],
),
                    const SizedBox(height: 40),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}