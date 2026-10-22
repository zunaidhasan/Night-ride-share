import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';
import '../../../../core/constants/app_constants.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../../shared/widgets/app_button.dart';

class SafetyScreen extends StatefulWidget {
  const SafetyScreen({super.key});

  @override
  State<SafetyScreen> createState() => _SafetyScreenState();
}

class _SafetyScreenState extends State<SafetyScreen> {
  final _messageController = TextEditingController();
  bool _sent = false;

  @override
  void dispose() {
    _messageController.dispose();
    super.dispose();
  }

  Future<void> _call(String number) async {
    final uri = Uri.parse('tel:$number');
    if (await canLaunchUrl(uri)) await launchUrl(uri);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(title: const Text('Safety Center')),
      body: ListView(
        padding: const EdgeInsets.all(20),
        children: [
          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              color: AppColors.error.withValues(alpha: 0.08),
              borderRadius: BorderRadius.circular(20),
              border: Border.all(color: AppColors.error.withValues(alpha: 0.2)),
            ),
            child: Column(
              children: [
                const Icon(Icons.emergency, color: AppColors.error, size: 40),
                const SizedBox(height: 12),
                const Text('Emergency?', style: TextStyle(fontWeight: FontWeight.w800, fontSize: 20, color: AppColors.error)),
                const SizedBox(height: 4),
                const Text('Call police immediately if you feel unsafe', textAlign: TextAlign.center, style: TextStyle(color: AppColors.textSecondary)),
                const SizedBox(height: 16),
                AppButton(
                  label: 'Call 999 (Police)',
                  variant: AppButtonVariant.danger,
                  icon: Icons.phone,
                  onPressed: () => _call(AppConstants.policeHotline),
                ),
              ],
            ),
          ),
          const SizedBox(height: 24),
          const Text('Quick Contacts', style: TextStyle(fontWeight: FontWeight.w700, fontSize: 16)),
          const SizedBox(height: 12),
          ListTile(
            leading: const Icon(Icons.local_police, color: AppColors.error),
            title: const Text('Police Hotline'),
            subtitle: Text(AppConstants.policeHotline),
            trailing: const Icon(Icons.phone),
            onTap: () => _call(AppConstants.policeHotline),
          ),
          ListTile(
            leading: const Icon(Icons.phone_in_talk, color: AppColors.info),
            title: const Text('District Hotline'),
            subtitle: Text(AppConstants.districtHotline),
            trailing: const Icon(Icons.phone),
            onTap: () => _call(AppConstants.districtHotline),
          ),
          ListTile(
            leading: const Icon(Icons.support_agent, color: AppColors.primary),
            title: const Text('Nishith Control Room'),
            subtitle: const Text('24/7 Support'),
            trailing: const Icon(Icons.phone),
            onTap: () => _call(AppConstants.supportPhone),
          ),
          const SizedBox(height: 28),
          const Text('Report an Issue', style: TextStyle(fontWeight: FontWeight.w700, fontSize: 16)),
          const SizedBox(height: 12),
          TextField(controller: _messageController, maxLines: 4, decoration: const InputDecoration(hintText: 'Describe the issue...')),
          const SizedBox(height: 12),
          AppButton(
            label: _sent ? 'Message Sent' : 'Send to Control Room',
            onPressed: _sent ? null : () {
              setState(() => _sent = true);
              ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Support team will contact you shortly')));
            },
          ),
        ],
      ),
    );
  }
}
