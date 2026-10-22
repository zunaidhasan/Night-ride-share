import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../../shared/models/vehicle_model.dart';
import '../../../../shared/widgets/app_button.dart';

class BookingScreen extends ConsumerStatefulWidget {
  const BookingScreen({super.key, this.initialVehicleType});
  final String? initialVehicleType;

  @override
  ConsumerState<BookingScreen> createState() => _BookingScreenState();
}

class _BookingScreenState extends ConsumerState<BookingScreen> {
  String _selectedType = 'auto';
  bool _isForOther = false;
  String _paymentMethod = 'bkash';
  final _pickupController = TextEditingController(text: 'Current Location');
  final _dropoffController = TextEditingController();
  final _otherNameController = TextEditingController();
  final _otherPhoneController = TextEditingController();
  bool _isLoading = false;

  @override
  void initState() {
    super.initState();
    if (widget.initialVehicleType != null) _selectedType = widget.initialVehicleType!;
  }

  @override
  void dispose() {
    _pickupController.dispose();
    _dropoffController.dispose();
    _otherNameController.dispose();
    _otherPhoneController.dispose();
    super.dispose();
  }

  Map<String, dynamic> get _selectedVehicle =>
      VehicleDisplay.fleet.firstWhere((v) => v['id'] == _selectedType, orElse: () => VehicleDisplay.fleet.first);

  Future<void> _confirmBooking() async {
    if (_dropoffController.text.trim().isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Please enter drop-off location')));
      return;
    }
    setState(() => _isLoading = true);
    await Future.delayed(const Duration(seconds: 1));
    if (mounted) {
      setState(() => _isLoading = false);
      context.push('/ride/demo-ride-id');
    }
  }

  @override
  Widget build(BuildContext context) {
    final vehicle = _selectedVehicle;
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        title: const Text('Book a Ride'),
        leading: IconButton(icon: const Icon(Icons.close_rounded), onPressed: () => context.pop()),
      ),
      body: Column(
        children: [
          Expanded(
            child: SingleChildScrollView(
              padding: const EdgeInsets.all(20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Container(
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(20),
                      border: Border.all(color: AppColors.border),
                    ),
                    child: Column(
                      children: [
                        _LocationRow(label: 'PICKUP', controller: _pickupController, icon: Icons.my_location_rounded, iconColor: AppColors.primary),
                        const Padding(padding: EdgeInsets.only(left: 20), child: Divider(height: 24)),
                        _LocationRow(label: 'DROPOFF', controller: _dropoffController, icon: Icons.location_on_rounded, iconColor: AppColors.accent, hint: 'Where are you going?'),
                      ],
                    ),
                  ),
                  const SizedBox(height: 24),
                  Text('Select Vehicle', style: Theme.of(context).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w700)),
                  const SizedBox(height: 12),
                  ...VehicleDisplay.fleet.map((v) {
                    final isSelected = _selectedType == v['id'];
                    return GestureDetector(
                      onTap: () => setState(() => _selectedType = v['id'] as String),
                      child: Container(
                        margin: const EdgeInsets.only(bottom: 10),
                        padding: const EdgeInsets.all(14),
                        decoration: BoxDecoration(
                          color: Colors.white,
                          borderRadius: BorderRadius.circular(16),
                          border: Border.all(color: isSelected ? AppColors.primary : AppColors.border, width: isSelected ? 2 : 1),
                        ),
                        child: Row(
                          children: [
                            Container(
                              width: 48, height: 48,
                              decoration: BoxDecoration(
                                color: (isSelected ? AppColors.primary : AppColors.textTertiary).withValues(alpha: 0.1),
                                borderRadius: BorderRadius.circular(12),
                              ),
                              child: Icon(_vehicleIcon(v['id'] as String), color: isSelected ? AppColors.primary : AppColors.textTertiary),
                            ),
                            const SizedBox(width: 14),
                            Expanded(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(v['name'] as String, style: TextStyle(fontWeight: FontWeight.w700, color: isSelected ? AppColors.primary : null)),
                                  Text(v['detail'] as String, style: const TextStyle(fontSize: 12, color: AppColors.textTertiary)),
                                ],
                              ),
                            ),
                            Column(
                              crossAxisAlignment: CrossAxisAlignment.end,
                              children: [
                                Text('\u09f3${(v['minFare'] as double).toInt()}', style: const TextStyle(fontWeight: FontWeight.w700)),
                                Text(v['etaText'] as String, style: const TextStyle(fontSize: 11, color: AppColors.success, fontWeight: FontWeight.w600)),
                              ],
                            ),
                          ],
                        ),
                      ),
                    );
                  }),
                  const SizedBox(height: 20),
                  SwitchListTile(
                    contentPadding: EdgeInsets.zero,
                    title: const Text('Book for someone else'),
                    subtitle: const Text('Enter their name and phone'),
                    value: _isForOther,
                    activeColor: AppColors.primary,
                    onChanged: (v) => setState(() => _isForOther = v),
                  ),
                  if (_isForOther) ...[
                    const SizedBox(height: 8),
                    TextField(controller: _otherNameController, decoration: const InputDecoration(labelText: 'Passenger name', prefixIcon: Icon(Icons.person_outline))),
                    const SizedBox(height: 12),
                    TextField(controller: _otherPhoneController, keyboardType: TextInputType.phone, decoration: const InputDecoration(labelText: 'Passenger phone', prefixIcon: Icon(Icons.phone_outlined))),
                  ],
                  const SizedBox(height: 24),
                  Text('Payment Method', style: Theme.of(context).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w700)),
                  const SizedBox(height: 12),
                  Wrap(
                    spacing: 10,
                    children: ['bkash', 'nagad', 'cash'].map((m) {
                      final selected = _paymentMethod == m;
                      final label = m == 'bkash' ? 'bKash' : m == 'nagad' ? 'Nagad' : 'Cash';
                      return GestureDetector(
                        onTap: () => setState(() => _paymentMethod = m),
                        child: Container(
                          padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 10),
                          decoration: BoxDecoration(
                            color: selected ? AppColors.primary : Colors.white,
                            borderRadius: BorderRadius.circular(24),
                            border: Border.all(color: selected ? AppColors.primary : AppColors.border),
                          ),
                          child: Text(label, style: TextStyle(fontWeight: FontWeight.w600, color: selected ? Colors.white : AppColors.textPrimary)),
                        ),
                      );
                    }).toList(),
                  ),
                ],
              ),
            ),
          ),
          Container(
            padding: const EdgeInsets.fromLTRB(20, 16, 20, 24),
            decoration: BoxDecoration(
              color: Colors.white,
              boxShadow: [BoxShadow(color: Colors.black.withValues(alpha: 0.06), blurRadius: 16, offset: const Offset(0, -4))],
            ),
            child: SafeArea(
              top: false,
              child: Column(
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      const Text('Estimated fare', style: TextStyle(color: AppColors.textSecondary)),
                      Text(
                        '\u09f3${(vehicle['minFare'] as double).toInt()} – \u09f3${((vehicle['minFare'] as double) * 1.8).toInt()}',
                        style: const TextStyle(fontWeight: FontWeight.w800, fontSize: 18),
                      ),
                    ],
                  ),
                  const SizedBox(height: 14),
                  AppButton(label: 'Confirm Booking', onPressed: _confirmBooking, isLoading: _isLoading),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  IconData _vehicleIcon(String id) => switch (id) {
    'auto' => Icons.electric_rickshaw,
    'cng' => Icons.local_taxi,
    'rickshaw' => Icons.pedal_bike,
    'ambulance' => Icons.medical_services,
    _ => Icons.directions_car,
  };
}

class _LocationRow extends StatelessWidget {
  const _LocationRow({required this.label, required this.controller, required this.icon, required this.iconColor, this.hint});
  final String label;
  final TextEditingController controller;
  final IconData icon;
  final Color iconColor;
  final String? hint;

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Container(
          width: 40, height: 40,
          decoration: BoxDecoration(color: iconColor.withValues(alpha: 0.1), shape: BoxShape.circle),
          child: Icon(icon, color: iconColor, size: 20),
        ),
        const SizedBox(width: 12),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(label, style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w600, color: AppColors.textTertiary, letterSpacing: 0.5)),
              TextField(
                controller: controller,
                decoration: InputDecoration(
                  hintText: hint,
                  border: InputBorder.none,
                  enabledBorder: InputBorder.none,
                  focusedBorder: InputBorder.none,
                  contentPadding: EdgeInsets.zero,
                  isDense: true,
                ),
                style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 15),
              ),
            ],
          ),
        ),
      ],
    );
  }
}
