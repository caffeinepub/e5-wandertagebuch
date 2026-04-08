import List "mo:core/List";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Common "../types/common";
import Types "../types/stages-and-photos";

module {
  public func initStages() : List.List<Types.Stage> {
    let stages = List.empty<Types.Stage>();
    stages.add({
      id = 1; number = 1;
      dateFrom = "04.08."; dateTo = "05.08.";
      startLocation = "Oberstdorf"; startElevation = 813;
      endLocation = "Kemptner Hütte"; endElevation = 1844;
      distanceKm = 13.0; ascentM = 1100; descentM = 100;
      estimatedTimeH = 5.0;
      accommodation = "Kemptner Hütte";
      isGipfeltag = false; taxiInfo = null;
    });
    stages.add({
      id = 2; number = 2;
      dateFrom = "05.08."; dateTo = "06.08.";
      startLocation = "Kemptner Hütte"; startElevation = 1844;
      endLocation = "Holzgau"; endElevation = 1100;
      distanceKm = 13.0; ascentM = 200; descentM = 900;
      estimatedTimeH = 5.0;
      accommodation = "Gästehaus Huber, Holzgau";
      isGipfeltag = false; taxiInfo = null;
    });
    stages.add({
      id = 3; number = 3;
      dateFrom = "06.08."; dateTo = "07.08.";
      startLocation = "Holzgau"; startElevation = 1100;
      endLocation = "Ansbacher Hütte"; endElevation = 2380;
      distanceKm = 10.0; ascentM = 1300; descentM = 100;
      estimatedTimeH = 5.0;
      accommodation = "Ansbacher Hütte";
      isGipfeltag = false;
      taxiInfo = ?{
        phone = "0043/5633 5633";
        departureTime = "08:15 Uhr";
        departureLocation = "Holzgau GH Bären";
        pricePerPerson = "EUR 17,-";
      };
    });
    stages.add({
      id = 4; number = 4;
      dateFrom = "07.08."; dateTo = "08.08.";
      startLocation = "Ansbacher Hütte"; startElevation = 2380;
      endLocation = "Venet Gipfelhütte / Zams"; endElevation = 1780;
      distanceKm = 14.0; ascentM = 400; descentM = 1850;
      estimatedTimeH = 6.0;
      accommodation = "Venet Gipfelhütte, Zams";
      isGipfeltag = false; taxiInfo = null;
    });
    stages.add({
      id = 5; number = 5;
      dateFrom = "08.08."; dateTo = "09.08.";
      startLocation = "Zams / Venet"; startElevation = 1780;
      endLocation = "Wenns"; endElevation = 870;
      distanceKm = 17.0; ascentM = 800; descentM = 700;
      estimatedTimeH = 7.0;
      accommodation = "Hotel Pension Weiratherhof, Wenns";
      isGipfeltag = false; taxiInfo = null;
    });
    stages.add({
      id = 6; number = 6;
      dateFrom = "09.08."; dateTo = "10.08.";
      startLocation = "Wenns"; startElevation = 870;
      endLocation = "Braunschweiger Hütte"; endElevation = 2759;
      distanceKm = 15.0; ascentM = 1450; descentM = 350;
      estimatedTimeH = 7.0;
      accommodation = "Braunschweiger Hütte";
      isGipfeltag = false; taxiInfo = null;
    });
    stages.add({
      id = 7; number = 7;
      dateFrom = "10.08."; dateTo = "11.08.";
      startLocation = "Braunschweiger Hütte"; startElevation = 2759;
      endLocation = "Vent"; endElevation = 1900;
      distanceKm = 12.0; ascentM = 200; descentM = 1200;
      estimatedTimeH = 5.0;
      accommodation = "Hotel Vent";
      isGipfeltag = false; taxiInfo = null;
    });
    stages.add({
      id = 8; number = 8;
      dateFrom = "11.08."; dateTo = "12.08.";
      startLocation = "Vent"; startElevation = 1900;
      endLocation = "Hochjoch Hospiz"; endElevation = 2413;
      distanceKm = 10.0; ascentM = 900; descentM = 200;
      estimatedTimeH = 5.0;
      accommodation = "Hochjoch Hospiz";
      isGipfeltag = false; taxiInfo = null;
    });
    stages.add({
      id = 9; number = 9;
      dateFrom = "12.08."; dateTo = "12.08.";
      startLocation = "Hochjoch Hospiz"; startElevation = 2413;
      endLocation = "Mittlere Guslarspitze"; endElevation = 3128;
      distanceKm = 8.0; ascentM = 750; descentM = 750;
      estimatedTimeH = 5.0;
      accommodation = "Hochjoch Hospiz (2. Nacht)";
      isGipfeltag = true; taxiInfo = null;
    });
    stages.add({
      id = 10; number = 10;
      dateFrom = "13.08."; dateTo = "14.08.";
      startLocation = "Hochjoch Hospiz"; startElevation = 2413;
      endLocation = "Vernagthütte"; endElevation = 1700;
      distanceKm = 8.0; ascentM = 100; descentM = 800;
      estimatedTimeH = 4.0;
      accommodation = "Vernagthütte";
      isGipfeltag = false; taxiInfo = null;
    });
    stages.add({
      id = 11; number = 11;
      dateFrom = "14.08."; dateTo = "15.08.";
      startLocation = "Vernagthütte"; startElevation = 1700;
      endLocation = "Gasthof Neuratheis / Schnals"; endElevation = 1500;
      distanceKm = 12.0; ascentM = 600; descentM = 1000;
      estimatedTimeH = 6.0;
      accommodation = "Gasthof Neuratheis, Schnals";
      isGipfeltag = false; taxiInfo = null;
    });
    stages.add({
      id = 12; number = 12;
      dateFrom = "15.08."; dateTo = "16.08.";
      startLocation = "Schnals"; startElevation = 1500;
      endLocation = "Meran"; endElevation = 325;
      distanceKm = 20.0; ascentM = 200; descentM = 1300;
      estimatedTimeH = 6.0;
      accommodation = "noch offen";
      isGipfeltag = false; taxiInfo = null;
    });
    stages;
  };

  public func getStages(stages : List.List<Types.Stage>) : [Types.Stage] {
    stages.toArray();
  };

  public func getStage(stages : List.List<Types.Stage>, id : Common.StageId) : ?Types.Stage {
    stages.find(func(s) { s.id == id });
  };

  public func addPhoto(
    photos : List.List<Types.Photo>,
    nextPhotoId : Nat,
    input : Types.PhotoInput,
    caller : Principal,
  ) : Types.Photo {
    let photo : Types.Photo = {
      id = nextPhotoId;
      stageId = input.stageId;
      blob = input.blob;
      description = input.description;
      elevation = input.elevation;
      uploadedBy = caller;
      timestamp = Time.now();
    };
    photos.add(photo);
    photo;
  };

  public func getPhotos(photos : List.List<Types.Photo>, stageId : Common.StageId) : [Types.Photo] {
    photos.filter(func(p) { p.stageId == stageId }).toArray();
  };

  public func deletePhoto(
    photos : List.List<Types.Photo>,
    photoId : Common.PhotoId,
    caller : Principal,
  ) : Bool {
    switch (photos.findIndex(func(p) { p.id == photoId })) {
      case null { false };
      case (?idx) {
        let photo = photos.at(idx);
        if (not Principal.equal(photo.uploadedBy, caller)) {
          Runtime.trap("Nicht berechtigt: Du kannst nur deine eigenen Fotos löschen");
        };
        // Remove by rebuilding without this index
        let filtered = photos.filter(func(p) { p.id != photoId });
        photos.clear();
        photos.append(filtered);
        true;
      };
    };
  };

  public func saveGpx(
    gpxFiles : List.List<Types.GpxData>,
    _stageId : Common.StageId,
    data : Types.GpxData,
  ) {
    // Remove existing GPX for same stageId, then add new one
    let filtered = gpxFiles.filter(func(g) { g.stageId != data.stageId });
    gpxFiles.clear();
    gpxFiles.append(filtered);
    gpxFiles.add(data);
  };

  public func getGpx(gpxFiles : List.List<Types.GpxData>, stageId : Common.StageId) : ?Types.GpxData {
    gpxFiles.find(func(g) { g.stageId == stageId });
  };
};
