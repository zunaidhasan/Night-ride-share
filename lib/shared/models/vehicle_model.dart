import 'package:freezed_annotation/freezed_annotation.dart';

part 'vehicle_model.freezed.dart';
part 'vehicle_model.g.dart';

enum VehicleType {
  @JsonValue('auto')
  auto,
  @JsonValue('cng')
  cng,
  @JsonValue('rickshaw')
  rickshaw,
  @JsonValue('ambulance')
  ambulance,
}

@freezed
class VehicleModel with _$VehicleModel {
  const factory VehicleModel({
    required String id,
    required String name,
    required VehicleType type,
    required String plateNumber,
    String? driverId,
    String? driverName,
    String? driverPhone,
    double? rating,
    int? totalRides,
    @Default(true) bool isAvailable,
    double? currentLat,
    double? currentLng,
    String? imageUrl,
    required double baseFare,
    required double perKmRate,
    required double minFare,
    String? etaText,
    String? detail,
  }) = _VehicleModel;

  factory VehicleModel.fromJson(Map<String, dynamic> json) =>
      _$VehicleModelFromJson(json);
}

class VehicleDisplay {
  static const List<Map<String, dynamic>> fleet = [
    {
      'id': 'auto',
      'name': 'Auto Rickshaw',
      'type': VehicleType.auto,
      'detail': '3-seater · Fast city rides',
      'baseFare': 30.0,
      'perKmRate': 15.0,
      'minFare': 40.0,
      'etaText': '3-6 min',
      'icon': 'auto',
    },
    {
      'id': 'cng',
      'name': 'CNG',
      'type': VehicleType.cng,
      'detail': '4-seater · Comfortable',
      'baseFare': 50.0,
      'perKmRate': 20.0,
      'minFare': 60.0,
      'etaText': '5-10 min',
      'icon': 'cng',
    },
    {
      'id': 'rickshaw',
      'name': 'Rickshaw',
      'type': VehicleType.rickshaw,
      'detail': '2-seater · Short distance',
      'baseFare': 20.0,
      'perKmRate': 12.0,
      'minFare': 25.0,
      'etaText': '4-8 min',
      'icon': 'rickshaw',
    },
    {
      'id': 'ambulance',
      'name': 'Ambulance',
      'type': VehicleType.ambulance,
      'detail': 'Emergency medical transport',
      'baseFare': 200.0,
      'perKmRate': 40.0,
      'minFare': 250.0,
      'etaText': '8-15 min',
      'icon': 'ambulance',
    },
  ];
}
