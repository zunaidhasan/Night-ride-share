import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../../shared/widgets/app_button.dart';

class ActiveRideScreen extends StatefulWidget {
  const ActiveRideScreen({super.key, required this.rideId});
  final String rideId;

  @override
  State<ActiveRideScreen> createState() => _ActiveRideScreenState();
}

class _ActiveRideScreenState extends State<ActiveRideScreen> {
  String _status = 'searching';
  int _rating = 0;

  @override
  void initState() {
    super.initState();
    _simulateProgress();
  }

  Future<void> _simulateProgress() async {
    await Future.delayed(const Duration(seconds: 3));
    if (!mounted) return;
    setState(() => _status = 'accepted');
    await Future.delayed(const Duration(seconds: 4));
    if (!mounted) return;
    setState(() => _status = 'arriving');
    await Future.delayed(const Duration(seconds: 5));
    if (!mounted) return;
    setState(() => _status = 'in_progress');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          Container(
            color: const Color(0xFFE8F0E9),
            child: const Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(Icons.map_outlined, size: 64, color: AppColors.primary),
                  SizedBox(height: 12),
                  Text('Map View\n(Google Maps integration)', textAlign: TextAlign.center, style: TextStyle(color: AppColors.textSecondary)),
                ],
              ),
            ),
          ),
          SafeArea(
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Row(
                children: [
                  CircleAvatar(
                    backgroundColor: Colors.white,
                    child: IconButton(
                      icon: const Icon(Icons.arrow_back_ios_new_rounded, size: 18),
                      onPressed: () => context.go('/'),
                    ),
                  ),
                  const Spacer(),
                  if (_status != 'completed')
                    CircleAvatar(
                      backgroundColor: AppColors.error,
                      child: IconButton(
                        icon: const Icon(Icons.shield, color: Colors.white, size: 20),
                        onPressed: () => context.push('/safety'),
                      ),
                    ),
                ],
              ),
            ),
          ),
          DraggableScrollableSheet(
            initialChildSize: 0.42,
            minChildSize: 0.28,
            maxChildSize: 0.75,
            builder: (context, scrollController) {
              return Container(
                decoration: const BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.vertical(top: Radius.circular(28)),
                  boxShadow: [BoxShadow(color: Colors.black12, blurRadius: 20, offset: Offset(0, -4))],
                ),
                child: ListView(
                  controller: scrollController,
                  padding: const EdgeInsets.fromLTRB(20, 12, 20, 32),
                  children: [
                    Center(child: Container(width: 40, height: 4, decoration: BoxDecoration(color: AppColors.border, borderRadius: BorderRadius.circular(2)))),
                    const SizedBox(height: 20),
                    _buildStatusHeader(),
                    const SizedBox(height: 20),
                    if (_status == 'searching') _buildSearching(),
                    if (_status == 'accepted' || _status == 'arriving') _buildDriverCard(),
                    if (_status == 'in_progress') _buildInProgress(),
                    if (_status == 'completed') _buildCompleted(),
                    const SizedBox(height: 16),
                    if (_status != 'completed' && _status != 'searching')
                      Row(
                        children: [
                          Expanded(child: AppButton(label: 'Call Driver', variant: AppButtonVariant.outline, icon: Icons.phone, onPressed: () {})),
                          const SizedBox(width: 12),
                          Expanded(child: AppButton(label: 'Cancel', variant: AppButtonVariant.danger, onPressed: () { setState(() => _status = 'cancelled'); context.go('/'); })),
                        ],
                      ),
                  ],
                ),
              );
            },
          ),
        ],
      ),
    );
  }

  Widget _buildStatusHeader() {
    final (title, subtitle, color) = switch (_status) {
      'searching' => ('Finding a driver...', 'This usually takes under a minute', AppColors.primary),
      'accepted' => ('Driver accepted', 'On the way to pickup', AppColors.success),
      'arriving' => ('Driver is arriving', 'Please be ready', AppColors.accent),
      'in_progress' => ('Ride in progress', 'Heading to destination', AppColors.primary),
      'completed' => ('Ride completed', 'Thank you for riding with Nishith', AppColors.success),
      _ => ('Ride update', '', AppColors.textSecondary),
    };
    return Column(
      children: [
        Container(
          width: 56, height: 56,
          decoration: BoxDecoration(color: color.withValues(alpha: 0.12), shape: BoxShape.circle),
          child: Icon(_status == 'searching' ? Icons.search : Icons.check_circle, color: color, size: 28),
        ),
        const SizedBox(height: 12),
        Text(title, style: const TextStyle(fontSize: 20, fontWeight: FontWeight.w800)),
        const SizedBox(height: 4),
        Text(subtitle, style: const TextStyle(color: AppColors.textSecondary)),
      ],
    );
  }

  Widget _buildSearching() {
    return const Column(
      children: [
        SizedBox(height: 12),
        LinearProgressIndicator(backgroundColor: AppColors.border, color: AppColors.primary),
        SizedBox(height: 16),
        Text('Matching you with a nearby vehicle...', style: TextStyle(color: AppColors.textSecondary)),
      ],
    );
  }

  Widget _buildDriverCard() {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(color: AppColors.background, borderRadius: BorderRadius.circular(16)),
      child: const Row(
        children: [
          CircleAvatar(radius: 28, backgroundColor: AppColors.primary, child: Icon(Icons.person, color: Colors.white, size: 28)),
          SizedBox(width: 14),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('Karim Ahmed', style: TextStyle(fontWeight: FontWeight.w700, fontSize: 16)),
                SizedBox(height: 2),
                Text('Toyota CNG \u00b7 \u09a2\u09be\u0995\u09be-\u09ae\u09c7\u099f\u09cd\u09b0\u09cb-\u0997-12-3456', style: TextStyle(fontSize: 13, color: AppColors.textSecondary)),
                SizedBox(height: 4),
                Row(children: [
                  Icon(Icons.star, size: 14, color: AppColors.accent),
                  SizedBox(width: 4),
                  Text('4.9 \u00b7 1,240 trips', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600)),
                ]),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildInProgress() {
    return Column(
      children: [
        _buildDriverCard(),
        const SizedBox(height: 16),
        Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(color: AppColors.nightSurface, borderRadius: BorderRadius.circular(16)),
          child: const Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              _StatItem(label: 'Distance', value: '4.2 km'),
              _StatItem(label: 'ETA', value: '12 min'),
              _StatItem(label: 'Fare', value: '\u09f385'),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildCompleted() {
    return Column(
      children: [
        const Text('How was your ride?', style: TextStyle(fontWeight: FontWeight.w700, fontSize: 16)),
        const SizedBox(height: 12),
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: List.generate(5, (i) {
            return IconButton(
              onPressed: () => setState(() => _rating = i + 1),
              icon: Icon(i < _rating ? Icons.star_rounded : Icons.star_outline_rounded, color: AppColors.accent, size: 36),
            );
          }),
        ),
        const SizedBox(height: 16),
        AppButton(label: 'Submit & Done', onPressed: () => context.go('/')),
      ],
    );
  }
}

class _StatItem extends StatelessWidget {
  const _StatItem({required this.label, required this.value});
  final String label;
  final String value;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text(value, style: const TextStyle(color: Colors.white, fontWeight: FontWeight.w800, fontSize: 18)),
        const SizedBox(height: 2),
        Text(label, style: TextStyle(color: Colors.white.withValues(alpha: 0.6), fontSize: 12)),
      ],
    );
  }
}
