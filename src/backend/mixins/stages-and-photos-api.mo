import List "mo:core/List";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Storage "mo:caffeineai-object-storage/Storage";
import Time "mo:core/Time";
import Common "../types/common";
import Types "../types/stages-and-photos";
import Lib "../lib/stages-and-photos";

mixin (
  stages : List.List<Types.Stage>,
  photos : List.List<Types.Photo>,
  gpxFiles : List.List<Types.GpxData>,
) {
  var nextPhotoId : Nat = 0;

  public query func getStages() : async [Types.Stage] {
    Lib.getStages(stages);
  };

  public query func getStage(id : Common.StageId) : async ?Types.Stage {
    Lib.getStage(stages, id);
  };

  public shared ({ caller }) func addPhoto(input : Types.PhotoInput) : async Types.Photo {
    if (caller.isAnonymous()) {
      Runtime.trap("Nicht autorisiert: Bitte mit Internet Identity anmelden");
    };
    let photo = Lib.addPhoto(photos, nextPhotoId, input, caller);
    nextPhotoId += 1;
    photo;
  };

  public query func getPhotos(stageId : Common.StageId) : async [Types.Photo] {
    Lib.getPhotos(photos, stageId);
  };

  public shared ({ caller }) func deletePhoto(photoId : Common.PhotoId) : async Bool {
    if (caller.isAnonymous()) {
      Runtime.trap("Nicht autorisiert: Bitte mit Internet Identity anmelden");
    };
    Lib.deletePhoto(photos, photoId);
  };

  public shared ({ caller }) func uploadGpx(stageId : Common.StageId, blob : Storage.ExternalBlob) : async { #ok; #err : Text } {
    if (caller.isAnonymous()) {
      return #err("Nicht autorisiert: Bitte mit Internet Identity anmelden");
    };
    let gpxData : Types.GpxData = {
      stageId;
      blob;
      uploadedAt = Time.now();
    };
    Lib.saveGpx(gpxFiles, stageId, gpxData);
    #ok;
  };

  public query func getGpx(stageId : Common.StageId) : async { #ok : Types.GpxData; #err : Text } {
    switch (Lib.getGpx(gpxFiles, stageId)) {
      case (?data) { #ok(data) };
      case null { #err("Keine GPX-Datei für diese Etappe gefunden") };
    };
  };
};
