import 'package:flutter/material.dart';
import '../../constants/colors.dart';
import '../../widgets/custom_widgets.dart';

class OnboardingPage {
  final String title;
  final String description;
  final String imagePath;
  final Color backgroundColor;
  final Color buttonColor;

  OnboardingPage({
    required this.title,
    required this.description,
    required this.imagePath,
    required this.backgroundColor,
    required this.buttonColor,
  });
}

class OnboardingPageWidget extends StatelessWidget {
  final OnboardingPage page;
  final VoidCallback onNext;

  const OnboardingPageWidget({
    Key? key,
    required this.page,
    required this.onNext,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      color: page.backgroundColor,
      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 40),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Expanded(
            flex: 5,
            child: Image.asset(
              page.imagePath,
              fit: BoxFit.contain,
            ),
          ),
          const SizedBox(height: 32),
          Text(
            page.title,
            style: const TextStyle(
              fontSize: 24,
              fontWeight: FontWeight.bold,
              color: AppColors.textDark,
            ),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 16),
          Text(
            page.description,
            style: const TextStyle(
              fontSize: 16,
              color: AppColors.textMedium,
            ),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 32),
          CircularNextButton(
            onPressed: onNext,
            color: page.buttonColor,
          ),
          const SizedBox(height: 24),
        ],
      ),
    );
  }
}

// Sample data for onboarding pages based on the images
final List<OnboardingPage> onboardingPages = [
  OnboardingPage(
    title: "Share Your Knowledge",
    description: "Connect with others and share your expertise. Be part of a community that values learning.",
    imagePath: "assets/images/share_knowledge.png",
    backgroundColor: Colors.white,
    buttonColor: AppColors.primaryBlue,
  ),
  OnboardingPage(
    title: "Unleash Your Creativity",
    description: "Express your ideas and showcase your talent. Find inspiration in a supportive environment.",
    imagePath: "assets/images/unleash_creativity.png",
    backgroundColor: Colors.white,
    buttonColor: AppColors.primaryBlue,
  ),
  OnboardingPage(
    title: "Achieve & Shine",
    description: "Set goals, track progress, and celebrate achievements. Grow with every step you take.",
    imagePath: "assets/images/achieve_shine.png",
    backgroundColor: Colors.white,
    buttonColor: AppColors.primaryBlue,
  ),
  OnboardingPage(
    title: "Level Up",
    description: "Take your skills to the next level with personalized learning paths and valuable feedback.",
    imagePath: "assets/images/level_up.png",
    backgroundColor: Colors.white,
    buttonColor: AppColors.primaryPurple,
  ),
];