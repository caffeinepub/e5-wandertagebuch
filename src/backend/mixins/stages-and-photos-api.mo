import List "mo:core/List";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Storage "mo:caffeineai-object-storage/Storage";
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

  public query func getPhotos(stageId : Common.StageId) : async [Types.Photo] {
    Lib.getPhotos(photos, stageId);
  };

  public query func getGpx(stageId : Common.StageId) : async ?Types.GpxData {
    Lib.getGpx(gpxFiles, stageId);
  };

  public shared ({ caller }) func addPhoto(input : Types.PhotoInput) : async Types.Photo {
    if (caller.isAnonymous()) {
      Runtime.trap("Anmeldung erforderlich um Fotos hochzuladen");
    };
    let photo = Lib.addPhoto(photos, nextPhotoId, input, caller);
    nextPhotoId += 1;
    photo;
  };

  public shared ({ caller }) func deletePhoto(photoId : Common.PhotoId) : async Bool {
    if (caller.isAnonymous()) {
      Runtime.trap("Anmeldung erforderlich um Fotos zu löschen");
    };
    Lib.deletePhoto(photos, photoId, caller);
  };

  public shared ({ caller }) func uploadGpx(stageId : Common.StageId, blob : Storage.ExternalBlob) : async () {
    if (caller.isAnonymous()) {
      Runtime.trap("Anmeldung erforderlich um GPX-Dateien hochzuladen");
    };
    let data : Types.GpxData = {
      stageId;
      blob;
      uploadedAt = Time.now();
    };
    Lib.saveGpx(gpxFiles, stageId, data);
  };
};
