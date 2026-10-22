import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../../shared/models/vehicle_model.dart';

class VehiclesScreen extends StatelessWidget {
  const VehiclesScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(title: const Text('Available Vehicles'), automaticallyImplyLeading: false),
      body: ListView.separated(
        padding: const EdgeInsets.all(20),
        itemCount: VehicleDisplay.fleet.length,
        separatorBuilder: (_, __) => const SizedBox(height: 14),
        itemBuilder: (context, index) {
          final v = VehicleDisplay.fleet[index];
          final colors = [AppColors.auto, AppColors.cng, AppColors.rickshaw, AppColors.ambulance];
          final color = colors[index % colors.length];
          return GestureDetector(
            onTap: () => context.push('/booking?type=${v['id']}'),
            child: Container(
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(20),
                border: Border.all(color: AppColors.border),
              ),
              child: Column(
                children: [
                  Container(
                    height: 100,
                    width: double.infinity,
                    decoration: BoxDecoration(
                      color: color.withValues(alpha: 0.1),
                      borderRadius: const BorderRadius.vertical(top: Radius.circular(20)),
                    ),
                    child: Icon(_icon(v['id'] as String), size: 48, color: color),
                  ),
                  Padding(
                    padding: const EdgeInsets.all(16),
                    child: Row(
                      children: [
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(v['name'] as String, style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 17)),
                              Text(v['detail'] as String, style: const TextStyle(color: AppColors.textTertiary, fontSize: 13)),
                            ],
                          ),
                        ),
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.end,
                          children: [
                            Text('From ৳${(v['minFare'] as double).toInt()}', style: const TextStyle(fontWeight: FontWeight.w700)),
                            Container(
                              margin: const EdgeInsets.only(top: 4),
                              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                              decoration: BoxDecoration(
                                color: AppColors.success.withValues(alpha: 0.1),
                                borderRadius: BorderRadius.circular(12),
                              ),
                              child: Text(v['etaText'] as String, style: const TextStyle(color: AppColors.success, fontSize: 11, fontWeight: FontWeight.w700)),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }

  IconData _icon(String id) {
    return switch (id) {
      'auto' => Icons.electric_rickshaw,
      'cng' => Icons.local_taxi,
      'rickshaw' => Icons.pedal_bike,
      'ambulance' => Icons.medical_services,
      _ => Icons.directions_car,
    };
  }
}
