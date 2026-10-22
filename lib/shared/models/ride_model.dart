import 'package:freezed_annotation/freezed_annotation.dart';
import 'vehicle_model.dart';

part 'ride_model.freezed.dart';
part 'ride_model.g.dart';

enum RideStatus {
  @JsonValue('searching')
  searching,
  @JsonValue('accepted')
  accepted,
  @JsonValue('arriving')
  arriving,
  @JsonValue('in_progress')
  inProgress,
  @JsonValue('completed')
  completed,
  @JsonValue('cancelled')
  cancelled,
}

enum PaymentMethod {
  @JsonValue('bkash')
  bkash,
  @JsonValue('nagad')
  nagad,
  @JsonValue('cash')
  cash,
  @JsonValue('card')
  card,
}

enum PaymentStatus {
  @JsonValue('pending')
  pending,
  @JsonValue('paid')
  paid,
  @JsonValue('failed')
  failed,
  @JsonValue('refunded')
  refunded,
}

@freezed
class RideModel with _$RideModel {
  const factory RideModel({
    required String id,
    required String riderId,
    String? driverId,
    String? vehicleId,
    required VehicleType vehicleType,
    required String pickupAddress,
    required double pickupLat,
    required double pickupLng,
    required String dropoffAddress,
    required double dropoffLat,
    required double dropoffLng,
    @Default(false) bool isForOther,
    String? otherPersonName,
    String? otherPersonPhone,
    required RideStatus status,
    DateTime? acceptedAt,
    DateTime? startedAt,
    DateTime? completedAt,
    DateTime? cancelledAt,
    String? cancelReason,
    required double estimatedFare,
    double? finalFare,
    double? distanceKm,
    int? durationMinutes,
    required PaymentMethod paymentMethod,
    @Default(PaymentStatus.pending) PaymentStatus paymentStatus,
    int? rating,
    String? review,
    DateTime? createdAt,
    DateTime? updatedAt,
    String? driverName,
    String? driverPhone,
    String? driverAvatar,
    double? driverRating,
    String? vehiclePlate,
    String? vehicleName,
  }) = _RideModel;

  factory RideModel.fromJson(Map<String, dynamic> json) =>
      _$RideModelFromJson(json);
}
