import List "mo:core/List";
import Map "mo:core/Map";
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
  sessions : Map.Map<Common.SessionToken, Common.Timestamp>,
  passwordHash : Text,
) {
  var nextPhotoId : Nat = 0;
  public query func getStages() : async [Types.Stage] {
    Lib.getStages(stages);
  };

  public query func getStage(id : Common.StageId) : async ?Types.Stage {
    Lib.getStage(stages, id);
  };

  public shared func addPhoto(input : Types.PhotoInput, token : Common.SessionToken) : async Types.Photo {
    if (not Lib.validateSession(sessions, token)) {
      Runtime.trap("Nicht autorisiert: ungültiges oder abgelaufenes Token");
    };
    let photo = Lib.addPhoto(photos, nextPhotoId, input);
    nextPhotoId += 1;
    photo;
  };

  public query func getPhotos(stageId : Common.StageId) : async [Types.Photo] {
    Lib.getPhotos(photos, stageId);
  };

  public shared func deletePhoto(photoId : Common.PhotoId, token : Common.SessionToken) : async Bool {
    if (not Lib.validateSession(sessions, token)) {
      Runtime.trap("Nicht autorisiert: ungültiges oder abgelaufenes Token");
    };
    Lib.deletePhoto(photos, photoId);
  };

  public shared func verifyPassword(password : Text) : async ?Common.SessionToken {
    if (Lib.verifyPassword(passwordHash, password)) {
      Lib.cleanExpiredSessions(sessions);
      ?Lib.createSession(sessions);
    } else {
      null;
    };
  };

  public query func validateSession(token : Common.SessionToken) : async Bool {
    Lib.validateSession(sessions, token);
  };

  public shared func uploadGpx(stageId : Common.StageId, blob : Storage.ExternalBlob, token : Common.SessionToken) : async { #ok; #err : Text } {
    if (not Lib.validateSession(sessions, token)) {
      return #err("Nicht autorisiert: ungültiges oder abgelaufenes Token");
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
