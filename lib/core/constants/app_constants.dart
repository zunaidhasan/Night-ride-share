class AppConstants {
  AppConstants._();

  static const String appName = 'Nishith';
  static const String appTagline = 'Safe Night Rides in Jamalpur';
  static const String companyName = 'Arsly Tech';

  static const String defaultDistrict = 'Jamalpur';
  static const double defaultLat = 24.9375;
  static const double defaultLng = 89.9372;

  static const String policeHotline = '999';
  static const String districtHotline = '09612345678';
  static const String supportPhone = '+8809612345678';

  static const List<String> vehicleTypes = [
    'auto',
    'cng',
    'rickshaw',
    'ambulance',
  ];

  static const String statusSearching = 'searching';
  static const String statusAccepted = 'accepted';
  static const String statusArriving = 'arriving';
  static const String statusInProgress = 'in_progress';
  static const String statusCompleted = 'completed';
  static const String statusCancelled = 'cancelled';

  static const String paymentBkash = 'bkash';
  static const String paymentNagad = 'nagad';
  static const String paymentCash = 'cash';
  static const String paymentCard = 'card';

  static const int pageSize = 20;

  static const Duration searchTimeout = Duration(seconds: 45);
  static const Duration locationTimeout = Duration(seconds: 15);
}
