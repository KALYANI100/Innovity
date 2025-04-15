import 'package:flutter/material.dart';
import '../../constants/colors.dart';
import '../../widgets/custom_widgets.dart';
import './onboarding_pages.dart';
import '../role_selection_screen.dart';
import '../registration_screen.dart';

class OnboardingScreen extends StatefulWidget {
  const OnboardingScreen({Key? key}) : super(key: key);

  @override
  _OnboardingScreenState createState() => _OnboardingScreenState();
}

class _OnboardingScreenState extends State<OnboardingScreen> {
  final PageController _pageController = PageController();
  int _currentPageIndex = 0;

  @override
  void dispose() {
    _pageController.dispose();
    super.dispose();
  }

//   // void _goToNextPage() {
//   //   if (_currentPageIndex < onboardingPages.length - 1) {
//   //     _pageController.nextPage(
//   //       duration: const Duration(milliseconds: 300),
//   //       curve: Curves.easeInOut,
//   //     );
//   //   } else {
//   //     // Navigate to the role selection screen when onboarding is complete
//   //     Navigator.pushReplacement(
//   //       context,
//   //       MaterialPageRoute(builder: (context) => const RoleSelectionScreen()),
//   //     );
//   //   }
//   // }
//   void _goToNextPage() {
//   if (_currentPageIndex < onboardingPages.length - 1) {
//     _pageController.nextPage(
//       duration: const Duration(milliseconds: 300),
//       curve: Curves.easeInOut,
//     );
//   } else {
//     // Navigate to the registration screen when onboarding is complete
//     Navigator.pushReplacement(
//       context,
//       MaterialPageRoute(builder: (context) => const RegistrationScreen()),
//     );
//   }
// }

void _goToNextPage() {
  if (_currentPageIndex < onboardingPages.length - 1) {
    _pageController.nextPage(
      duration: const Duration(milliseconds: 300),
      curve: Curves.easeInOut,
    );
  } else {
    // Navigate to the registration screen when onboarding is complete
    Navigator.pushReplacement(
      context,
      MaterialPageRoute(builder: (context) => const RegistrationScreen()),
    );
  }
}

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          PageView.builder(
            controller: _pageController,
            itemCount: onboardingPages.length,
            onPageChanged: (index) {
              setState(() {
                _currentPageIndex = index;
              });
            },
            itemBuilder: (context, index) {
              return OnboardingPageWidget(
                page: onboardingPages[index],
                onNext: _goToNextPage,
              );
            },
          ),
          Positioned(
            bottom: 24,
            left: 0,
            right: 0,
            child: OnboardingPageIndicator(
              currentIndex: _currentPageIndex,
              pageCount: onboardingPages.length,
            ),
          ),
          Positioned(
            top: 40,
            right: 20,
            child: TextButton(
              onPressed: () {
                // Skip to the role selection screen
                Navigator.pushReplacement(
                  context,
                  MaterialPageRoute(builder: (context) => const RoleSelectionScreen()),
                );
              },
              child: const Text(
                "Skip",
                style: TextStyle(
                  color: AppColors.textMedium,
                  fontSize: 16,
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}