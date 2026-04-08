import Storage "mo:caffeineai-object-storage/Storage";
import Common "common";

module {
  public type TaxiInfo = {
    company : Text;
    phone : Text;
    departureTime : Text;
    departureLocation : Text;
    pricePerPerson : Text;
  };

  public type Stage = {
    id : Common.StageId;
    number : Nat;
    dateFrom : Text;
    dateTo : Text;
    startLocation : Text;
    startElevation : Nat;
    endLocation : Text;
    endElevation : Nat;
    distanceKm : Nat;
    elevationGainM : Nat;
    elevationLossM : Nat;
    estimatedTimeH : Nat;
    accommodation : Text;
    highlight : Text;
    isGipfeltag : Bool;
    taxiInfo : ?TaxiInfo;
  };

  public type Photo = {
    id : Common.PhotoId;
    stageId : Common.StageId;
    blob : Storage.ExternalBlob;
    description : Text;
    elevation : ?Nat;
    timestamp : Common.Timestamp;
  };

  public type PhotoInput = {
    stageId : Common.StageId;
    blob : Storage.ExternalBlob;
    description : Text;
    elevation : ?Nat;
  };

  public type GpxData = {
    stageId : Common.StageId;
    blob : Storage.ExternalBlob;
    uploadedAt : Common.Timestamp;
  };
};
