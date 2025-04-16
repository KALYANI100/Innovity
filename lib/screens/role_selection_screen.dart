import 'package:flutter/material.dart';
import '../constants/colors.dart';
import '../widgets/custom_widgets.dart';
import './onboarding/onboarding_screen.dart';
import './registration_screen.dart';

class RoleSelectionScreen extends StatefulWidget {
  const RoleSelectionScreen({Key? key}) : super(key: key);

  @override
  _RoleSelectionScreenState createState() => _RoleSelectionScreenState();
}

class _RoleSelectionScreenState extends State<RoleSelectionScreen> {
  String? _selectedRole;

  final List<Map<String, String>> _roles = [
    {
      'title': 'Student',
      'imagePath': 'assets/images/student.png',
    },
    {
      'title': 'Teacher',
      'imagePath': 'assets/images/teacher.png',
    },
    // Add more roles if needed
  ];

  void _selectRole(String role) {
    setState(() {
      _selectedRole = role;
    });
  }
  

  void _continueToOnboarding() {
    if (_selectedRole != null) {
      Navigator.push(
        context,
        MaterialPageRoute(builder: (context) => const OnboardingScreen()),
      );
    } else {
      // Show a snackbar or dialog asking the user to select a role
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Please select a role to continue'),
          backgroundColor: AppColors.primaryBlue,
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 20),
          child: Column(
            children: [
              const SizedBox(height: 40),
              const Text(
                'Select your role',
                style: TextStyle(
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                  color: AppColors.textDark,
                ),
              ),
              const SizedBox(height: 40),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: _roles.map((role) {
                  return Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 8),
                    child: RoleSelectionCard(
                      title: role['title']!,
                      imagePath: role['imagePath']!,
                      onTap: () => _selectRole(role['title']!),
                      isSelected: _selectedRole == role['title'],
                    ),
                  );
                }).toList(),
              ),
              const Spacer(),
              PrimaryButton(
                text: 'Continue',
                onPressed: _continueToOnboarding,
                color: AppColors.primaryGreen,
              ),
              const SizedBox(height: 24),
            ],
          ),
        ),
      ),
    );
  }
}