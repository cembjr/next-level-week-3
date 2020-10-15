import React, { useCallback } from "react";
import { Map, Marker, TileLayer } from "react-leaflet";
import { LeafletMouseEvent } from "leaflet";

import "./create-orphanage.css";
import { Sidebar } from "../../components/Sidebar";
import { FiPlus } from "react-icons/fi";
import { mapIcon } from "../../utils/mapIcon";
import api from "../../services/api";
import { useHistory } from "react-router-dom";

export default function CreateOrphanage() {

  const history = useHistory();

  const [positon, setPosition] = React.useState({
    latitude: 0,
    longitude: 0,
  });

  const [form, setForm] = React.useState({
    name: "",
    about: "",
    instructions: "",
    opening_hours: "",
    open_on_weekends: false,
  });

  const [images, setImages] = React.useState<File[]>([]);
  const [previewImages, setPreviewImages] = React.useState<string[]>([]);

  const handleFormChange = React.useCallback(
    (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { id, value } = evt.target;
      setForm({ ...form, [id]: value });
    },
    [form]
  );

  const handleOpenOnWeekends = React.useCallback(
    (open: boolean) => {
      setForm({ ...form, open_on_weekends: open });
    },
    [form]
  );

  const handleSubmit = React.useCallback(() => {
    const data = new FormData();

    data.append("name", form.name);
    data.append("about", form.about);
    data.append("instructions", form.instructions);
    data.append("opening_hours", form.opening_hours);
    data.append("open_on_weekends", String(form.open_on_weekends));
    data.append("latitude", String(positon.latitude));
    data.append("longitude", String(positon.longitude));
    
    images.forEach(image => data.append('images', image));

    api
      .post("orphanages", data)
      .then((sucess) => {
        alert("Orfanato gravado com sucesso!!");
        setForm({
          name: "",
          about: "",
          instructions: "",
          opening_hours: "",
          open_on_weekends: false,
        });
        setPosition({
          latitude: 0,
          longitude: 0,
        });
        setImages([]);
        setPreviewImages([]);
      })
      .catch((err) => console.log(err));
  }, [
    form.about,
    form.instructions,
    form.name,
    form.open_on_weekends,
    form.opening_hours,
    images,
    positon.latitude,
    positon.longitude,
  ]);

  const handleClick = useCallback((event: LeafletMouseEvent) => {
    const { lat, lng } = event.latlng;
    setPosition({
      latitude: lat,
      longitude: lng,
    });
  }, []);

  const handleSelectImages = React.useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      const selectedImages = Array.from(evt.target.files || []);
      setImages(selectedImages);

      const selectedImagesPreview = selectedImages.map((image) => {
        return URL.createObjectURL(image);
      });

      setPreviewImages(selectedImagesPreview);
    },
    []
  );

  return (
    <div id="page-create-orphanage">
      <Sidebar />

      <main>
        <form className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <Map
              center={[-27.2092052, -49.6401092]}
              style={{ width: "100%", height: 280 }}
              zoom={15}
              onclick={handleClick}
            >
              <TileLayer
                url={`https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />

              {positon.latitude !== 0 && (
                <Marker
                  interactive={false}
                  icon={mapIcon}
                  position={[positon.latitude, positon.longitude]}
                />
              )}
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input id="name" onChange={handleFormChange} value={form.name} />
            </div>

            <div className="input-block">
              <label htmlFor="about">
                Sobre <span>Máximo de 300 caracteres</span>
              </label>
              <textarea
                id="about"
                maxLength={300}
                onChange={handleFormChange}
                value={form.about}
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {previewImages.map((img) => (
                  <img key={img} src={img} alt={form.name} />
                ))}
                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>
              <input
                type="file"
                id="image[]"
                multiple
                onChange={handleSelectImages}
              />
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea
                id="instructions"
                onChange={handleFormChange}
                value={form.instructions}
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário</label>
              <input
                id="opening_hours"
                onChange={handleFormChange}
                value={form.opening_hours}
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button
                  type="button"
                  className={form.open_on_weekends ? "active" : ""}
                  onClick={() => handleOpenOnWeekends(true)}
                >
                  Sim
                </button>
                <button
                  type="button"
                  className={!form.open_on_weekends ? "active" : ""}
                  onClick={() => handleOpenOnWeekends(false)}
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <button
            className="confirm-button"
            type="button"
            onClick={handleSubmit}
          >
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
