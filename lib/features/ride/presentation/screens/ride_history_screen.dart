import 'package:flutter/material.dart';
import '../../../../core/theme/app_colors.dart';

class RideHistoryScreen extends StatelessWidget {
  const RideHistoryScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final rides = [
      {'to': 'Jamalpur Railway Station', 'from': 'Medical Road', 'date': '14 Jun, 11:42 PM', 'fare': '৳60', 'type': 'Auto'},
      {'to': 'Jamalpur General Hospital', 'from': 'Mymensingh Road', 'date': '08 Jun, 1:15 AM', 'fare': '৳180', 'type': 'CNG'},
      {'to': 'Islampur Bus Terminal', 'from': 'Bazar Road', 'date': '29 May, 10:30 PM', 'fare': '৳80', 'type': 'Rickshaw'},
    ];

    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(title: const Text('Ride History'), automaticallyImplyLeading: false),
      body: ListView.separated(
        padding: const EdgeInsets.all(20),
        itemCount: rides.length,
        separatorBuilder: (_, __) => const SizedBox(height: 12),
        itemBuilder: (context, index) {
          final ride = rides[index];
          return Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: AppColors.border),
            ),
            child: Row(
              children: [
                Container(
                  width: 48,
                  height: 48,
                  decoration: BoxDecoration(
                    color: AppColors.primary.withValues(alpha: 0.1),
                    borderRadius: BorderRadius.circular(14),
                  ),
                  child: const Icon(Icons.route, color: AppColors.primary),
                ),
                const SizedBox(width: 14),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(ride['to']!, style: const TextStyle(fontWeight: FontWeight.w700)),
                      Text('From ${ride['from']} · ${ride['date']}', style: const TextStyle(fontSize: 12, color: AppColors.textTertiary)),
                    ],
                  ),
                ),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.end,
                  children: [
                    Text(ride['fare']!, style: const TextStyle(fontWeight: FontWeight.w700)),
                    Text('${ride['type']} · Completed', style: const TextStyle(fontSize: 11, color: AppColors.success, fontWeight: FontWeight.w600)),
                  ],
                ),
              ],
            ),
          );
        },
      ),
    );
  }
}
