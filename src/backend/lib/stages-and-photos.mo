import List "mo:core/List";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import Common "../types/common";
import Types "../types/stages-and-photos";

module {
  public func initStages() : List.List<Types.Stage> {
    let stages = List.empty<Types.Stage>();
    stages.add({
      id = 1;
      number = 1;
      dateFrom = "04.08.2026";
      dateTo = "05.08.2026";
      startLocation = "Oberstdorf";
      startElevation = 813;
      endLocation = "Kemptner Hütte";
      endElevation = 1844;
      distanceKm = 13;
      elevationGainM = 1100;
      elevationLossM = 100;
      estimatedTimeH = 5;
      accommodation = "Kemptner Hütte";
      highlight = "Start des E5, Sperrbachtobel, erste Hüttennacht";
      isGipfeltag = false;
      taxiInfo = null;
    });
    stages.add({
      id = 2;
      number = 2;
      dateFrom = "05.08.2026";
      dateTo = "06.08.2026";
      startLocation = "Kemptner Hütte";
      startElevation = 1844;
      endLocation = "Holzgau";
      endElevation = 1100;
      distanceKm = 13;
      elevationGainM = 200;
      elevationLossM = 900;
      estimatedTimeH = 5;
      accommodation = "Gästehaus Huber, Holzgau";
      highlight = "Mädelejoch (Grenze D/A), Simms-Wasserfall, Holzgauer Hängebrücke";
      isGipfeltag = false;
      taxiInfo = null;
    });
    stages.add({
      id = 3;
      number = 3;
      dateFrom = "06.08.2026";
      dateTo = "07.08.2026";
      startLocation = "Holzgau";
      startElevation = 1100;
      endLocation = "Ansbacher Hütte";
      endElevation = 2380;
      distanceKm = 10;
      elevationGainM = 1300;
      elevationLossM = 100;
      estimatedTimeH = 5;
      accommodation = "Ansbacher Hütte";
      highlight = "Transfer Holzgau → Parkplatz Memminger Hütte, danach Aufstieg zur Ansbacher Hütte";
      isGipfeltag = false;
      taxiInfo = ?{
        company = "Taxi Feuerstein";
        phone = "0043/5633 5633";
        departureTime = "08:15 Uhr";
        departureLocation = "Holzgau GH Bären";
        pricePerPerson = "EUR 17,-";
      };
    });
    stages.add({
      id = 4;
      number = 4;
      dateFrom = "07.08.2026";
      dateTo = "08.08.2026";
      startLocation = "Ansbacher Hütte";
      startElevation = 2380;
      endLocation = "Venet Gipfelhütte / Zams";
      endElevation = 1780;
      distanceKm = 14;
      elevationGainM = 400;
      elevationLossM = 1850;
      estimatedTimeH = 6;
      accommodation = "Venet Gipfelhütte, Zams";
      highlight = "Seescharte (2.599 m), langer Abstieg durchs Zammer Loch, Inntal";
      isGipfeltag = false;
      taxiInfo = null;
    });
    stages.add({
      id = 5;
      number = 5;
      dateFrom = "08.08.2026";
      dateTo = "09.08.2026";
      startLocation = "Zams / Venet";
      startElevation = 1780;
      endLocation = "Wenns";
      endElevation = 870;
      distanceKm = 17;
      elevationGainM = 800;
      elevationLossM = 700;
      estimatedTimeH = 7;
      accommodation = "Hotel Pension Weiratherhof, Wenns";
      highlight = "Venetberg (2.208 m), Panoramablick Ötztaler Alpen, Pitztal";
      isGipfeltag = false;
      taxiInfo = null;
    });
    stages.add({
      id = 6;
      number = 6;
      dateFrom = "09.08.2026";
      dateTo = "10.08.2026";
      startLocation = "Wenns";
      startElevation = 870;
      endLocation = "Braunschweiger Hütte";
      endElevation = 2759;
      distanceKm = 15;
      elevationGainM = 1450;
      elevationLossM = 350;
      estimatedTimeH = 7;
      accommodation = "Braunschweiger Hütte";
      highlight = "Königsetappe, höchstgelegener Schlafplatz des E5, Gletscherblick Pitztal";
      isGipfeltag = false;
      taxiInfo = null;
    });
    stages.add({
      id = 7;
      number = 7;
      dateFrom = "10.08.2026";
      dateTo = "11.08.2026";
      startLocation = "Braunschweiger Hütte";
      startElevation = 2759;
      endLocation = "Vent";
      endElevation = 1900;
      distanceKm = 12;
      elevationGainM = 200;
      elevationLossM = 1200;
      estimatedTimeH = 5;
      accommodation = "Hotel Vent";
      highlight = "Pitztaler Jöchl (~3.000 m), Abstieg nach Vent";
      isGipfeltag = false;
      taxiInfo = null;
    });
    stages.add({
      id = 8;
      number = 8;
      dateFrom = "11.08.2026";
      dateTo = "12.08.2026";
      startLocation = "Vent";
      startElevation = 1900;
      endLocation = "Hochjoch Hospiz";
      endElevation = 2413;
      distanceKm = 10;
      elevationGainM = 900;
      elevationLossM = 200;
      estimatedTimeH = 5;
      accommodation = "Hochjoch Hospiz";
      highlight = "Rofental, Rofenhöfe, Gletscherwelt Ötztaler Alpen";
      isGipfeltag = false;
      taxiInfo = null;
    });
    stages.add({
      id = 9;
      number = 9;
      dateFrom = "12.08.2026";
      dateTo = "12.08.2026";
      startLocation = "Hochjoch Hospiz";
      startElevation = 2413;
      endLocation = "Mittlere Guslarspitze → Hochjoch Hospiz";
      endElevation = 3128;
      distanceKm = 8;
      elevationGainM = 750;
      elevationLossM = 750;
      estimatedTimeH = 5;
      accommodation = "Hochjoch Hospiz (2. Nacht)";
      highlight = "Gletscherfreier Dreitausender, markierter Steig, Gipfeltag mit Kindern (8 & 12 Jahre)";
      isGipfeltag = true;
      taxiInfo = null;
    });
    stages.add({
      id = 10;
      number = 10;
      dateFrom = "13.08.2026";
      dateTo = "14.08.2026";
      startLocation = "Hochjoch Hospiz";
      startElevation = 2413;
      endLocation = "Vernagthütte";
      endElevation = 1700;
      distanceKm = 8;
      elevationGainM = 100;
      elevationLossM = 800;
      estimatedTimeH = 4;
      accommodation = "Vernagthütte";
      highlight = "Vernagt-Stausee, Guslarspitzen";
      isGipfeltag = false;
      taxiInfo = null;
    });
    stages.add({
      id = 11;
      number = 11;
      dateFrom = "14.08.2026";
      dateTo = "15.08.2026";
      startLocation = "Vernagthütte";
      startElevation = 1700;
      endLocation = "Gasthof Neuratheis / Schnals";
      endElevation = 1500;
      distanceKm = 12;
      elevationGainM = 600;
      elevationLossM = 1000;
      estimatedTimeH = 6;
      accommodation = "Gasthof Neuratheis, Schnals";
      highlight = "Similaun-Hütte (3.019 m) — höchster Punkt der Tour, Übergang nach Südtirol, Ötzi-Fundstelle";
      isGipfeltag = false;
      taxiInfo = null;
    });
    stages.add({
      id = 12;
      number = 12;
      dateFrom = "15.08.2026";
      dateTo = "16.08.2026";
      startLocation = "Schnals";
      startElevation = 1500;
      endLocation = "Meran";
      endElevation = 325;
      distanceKm = 20;
      elevationGainM = 200;
      elevationLossM = 1300;
      estimatedTimeH = 6;
      accommodation = "noch offen";
      highlight = "Meraner Höhenweg, Waalwege, Ziel in Meran — You made it!";
      isGipfeltag = false;
      taxiInfo = null;
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
      timestamp = Time.now();
      uploadedBy = caller;
    };
    photos.add(photo);
    photo;
  };

  public func getPhotos(photos : List.List<Types.Photo>, stageId : Common.StageId) : [Types.Photo] {
    photos.filter(func(p) { p.stageId == stageId }).toArray();
  };

  public func deletePhoto(photos : List.List<Types.Photo>, photoId : Common.PhotoId) : Bool {
    let sizeBefore = photos.size();
    let filtered = photos.filter(func(p) { p.id != photoId });
    if (filtered.size() < sizeBefore) {
      photos.clear();
      photos.append(filtered);
      true;
    } else {
      false;
    };
  };

  public func saveGpx(
    gpxFiles : List.List<Types.GpxData>,
    stageId : Common.StageId,
    blob : Types.GpxData,
  ) {
    // Remove existing GPX for this stage, then add new one
    let filtered = gpxFiles.filter(func(g) { g.stageId != stageId });
    gpxFiles.clear();
    gpxFiles.append(filtered);
    gpxFiles.add(blob);
  };

  public func getGpx(gpxFiles : List.List<Types.GpxData>, stageId : Common.StageId) : ?Types.GpxData {
    gpxFiles.find(func(g) { g.stageId == stageId });
  };
};
