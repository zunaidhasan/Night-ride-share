import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../../shared/widgets/app_button.dart';

class LoginScreen extends ConsumerStatefulWidget {
  const LoginScreen({super.key});

  @override
  ConsumerState<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends ConsumerState<LoginScreen> {
  final _phoneController = TextEditingController();
  final _formKey = GlobalKey<FormState>();
  bool _isLoading = false;
  String? _error;

  @override
  void dispose() {
    _phoneController.dispose();
    super.dispose();
  }

  Future<void> _sendOtp() async {
    if (!_formKey.currentState!.validate()) return;
    setState(() { _isLoading = true; _error = null; });
    try {
      final phone = _normalizePhone(_phoneController.text.trim());
      await Supabase.instance.client.auth.signInWithOtp(phone: phone);
      if (mounted) context.pushNamed('otp', extra: phone);
    } on AuthException catch (e) {
      setState(() => _error = e.message);
    } catch (e) {
      setState(() => _error = 'Something went wrong. Please try again.');
    } finally {
      if (mounted) setState(() => _isLoading = false);
    }
  }

  String _normalizePhone(String input) {
    var cleaned = input.replaceAll(RegExp(r'[^\d+]'), '');
    if (cleaned.startsWith('01') && cleaned.length == 11) cleaned = '+88$cleaned';
    else if (cleaned.startsWith('8801')) cleaned = '+$cleaned';
    else if (!cleaned.startsWith('+')) cleaned = '+88$cleaned';
    return cleaned;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 32),
          child: Form(
            key: _formKey,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const SizedBox(height: 40),
                Container(
                  width: 64, height: 64,
                  decoration: BoxDecoration(color: AppColors.primary, borderRadius: BorderRadius.circular(20)),
                  child: const Icon(Icons.nightlight_round, color: Colors.white, size: 32),
                ),
                const SizedBox(height: 28),
                Text('Welcome to Nishith', style: Theme.of(context).textTheme.headlineMedium?.copyWith(fontWeight: FontWeight.w800)),
                const SizedBox(height: 8),
                Text('Safe night rides across Jamalpur.\nSign in with your phone number.',
                  style: Theme.of(context).textTheme.bodyLarge?.copyWith(color: AppColors.textSecondary, height: 1.5)),
                const SizedBox(height: 40),
                Text('Phone Number', style: Theme.of(context).textTheme.labelLarge?.copyWith(fontWeight: FontWeight.w600)),
                const SizedBox(height: 8),
                TextFormField(
                  controller: _phoneController,
                  keyboardType: TextInputType.phone,
                  inputFormatters: [
                    FilteringTextInputFormatter.allow(RegExp(r'[\d+]')),
                    LengthLimitingTextInputFormatter(14),
                  ],
                  decoration: const InputDecoration(
                    hintText: '01XXXXXXXXX',
                    prefixIcon: Padding(
                      padding: EdgeInsets.only(left: 16, right: 8),
                      child: Text('+88', style: TextStyle(fontWeight: FontWeight.w600, fontSize: 16)),
                    ),
                    prefixIconConstraints: BoxConstraints(minWidth: 0),
                  ),
                  validator: (value) {
                    if (value == null || value.trim().isEmpty) return 'Please enter your phone number';
                    final cleaned = value.replaceAll(RegExp(r'[^\d]'), '');
                    if (cleaned.length < 10) return 'Enter a valid Bangladeshi number';
                    return null;
                  },
                  onFieldSubmitted: (_) => _sendOtp(),
                ),
                if (_error != null) ...[
                  const SizedBox(height: 12),
                  Text(_error!, style: const TextStyle(color: AppColors.error, fontSize: 13)),
                ],
                const SizedBox(height: 28),
                AppButton(label: 'Continue', onPressed: _sendOtp, isLoading: _isLoading),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
