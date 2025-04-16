import 'package:flutter/material.dart';

class ChooseDomainScreen extends StatelessWidget {
  const ChooseDomainScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const SizedBox(height: 10),
              const Text(
                'Choose domain',
                style: TextStyle(
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 20),
              _buildDomainCard(
                context,
                title: 'Study Corner',
                color: Colors.orange,
                imageAsset: 'assets/images/study.png',
              ),
              const SizedBox(height: 20),
              _buildDomainCard(
                context,
                title: 'Creativity Corner',
                color: Colors.purple,
                imageAsset: 'assets/images/creativity.png',
              ),
              const SizedBox(height: 20),
              _buildDomainCard(
                context,
                title: 'Innovation Corner',
                color: Colors.green,
                imageAsset: 'assets/images/innovation.png',
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildDomainCard(BuildContext context,
      {required String title,
      required Color color,
      required String imageAsset}) {
    return Container(
      height: 100,
      decoration: BoxDecoration(
        color: color,
        borderRadius: BorderRadius.circular(16),
      ),
      child: Row(
        children: [
          const SizedBox(width: 16),
          Image.asset(
            imageAsset,
            height: 70,
            width: 70,
          ),
          const SizedBox(width: 16),
          Text(
            title,
            style: const TextStyle(
              color: Colors.white,
              fontSize: 18,
              fontWeight: FontWeight.bold,
            ),
          )
        ],
      ),
    );
  }
}
