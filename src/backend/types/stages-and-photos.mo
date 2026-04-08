import Storage "mo:caffeineai-object-storage/Storage";
import Common "common";

module {
  public type TaxiInfo = {
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
    startElevation : Int;
    endLocation : Text;
    endElevation : Int;
    distanceKm : Float;
    ascentM : Int;
    descentM : Int;
    estimatedTimeH : Float;
    accommodation : Text;
    isGipfeltag : Bool;
    taxiInfo : ?TaxiInfo;
  };

  public type Photo = {
    id : Common.PhotoId;
    stageId : Common.StageId;
    blob : Storage.ExternalBlob;
    description : Text;
    elevation : ?Float;
    uploadedBy : Principal;
    timestamp : Int;
  };

  public type PhotoInput = {
    stageId : Common.StageId;
    blob : Storage.ExternalBlob;
    description : Text;
    elevation : ?Float;
  };

  public type GpxData = {
    stageId : Common.StageId;
    blob : Storage.ExternalBlob;
    uploadedAt : Int;
  };
};
