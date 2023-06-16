import React, { useRef, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

export default function Questionnaire({ setCurrentUser, viewSwitcher }) {
  const { user } = useAuth0();
  const [ hobbyTags, setHobbyTags ] = useState([]);
  const birthdayInput = useRef();
  const cityInput = useRef();
  const stateInput = useRef();
  const hobbyInput = useRef();

  const addHobby = () => {
    const hobby = hobbyInput.current.value;

    if (hobby && hobbyTags.length < 10) {
      setHobbyTags((prevTags) => [...prevTags, hobby]);
      hobbyInput.current.value = "";
    }
  };

  const removeHobbyTag = (index) => {
    setHobbyTags((prevTags) => prevTags.filter((_, i) => i !== index));
  };

  const submitUserInfo = (e) => {
    e.preventDefault();

    const formattedBirthdayString = birthdayInput.current.value
      .split("-")
      .join("");

    const getGeolocation = async (location) => {
      try {
        const response = await axios.get(
          `http://localhost:3000/geolocation/${location}`
        );
        return response.data;
      } catch (error) {
        console.error(error);
        return null;
      }
    };

    let location = `${cityInput.current.value}, ${stateInput.current.value}`;

    getGeolocation(location)
      .then((coordinates) => {
        let body = {
          firstname: user.given_name,
          lastname: user.family_name,
          username: user.nickname,
          email: user.email,
          birthday: formattedBirthdayString,
          location: location,
          profile_pic: user.picture,
          banner_pic: "https://picsum.photos/id/866/800/300",
          hobbies: hobbyTags,
          latitude: coordinates.lat,
          longitude: coordinates.lng,
        };

        axios
          .post("http://localhost:3000/user", body)
          .then((response) => {
            console.log(response);
            axios
              .get(`http://localhost:3000/user/${user.nickname}`)
              .then((res) => {
                setCurrentUser(res.data);
                viewSwitcher(1);
              })
              .catch((err) => {
                console.error(err);
              });
          })
          .catch((err) => console.error(err));
      })
      .catch((error) => console.error(error));
  };
  return (
    <form onSubmit={submitUserInfo}>
      <div className="questionnaire-form-modal">
        <div className="questionnaire-form-content">
          <div className="questionnaire-form-header">
            <h3 className="questionnaire-form-title">
              Let&apos;s get to know you...
            </h3>
          </div>

          <div className="questionnaire-form-body">
            <div className="questionnaire-body-header">
              <h5 className="questionnaire-form-subtitle">
                Personal Information
              </h5>
            </div>

            <div className="questionnaire-form-input">
              <h6>Birthday:</h6>
              <label htmlFor="birthday-input"></label>
              <input
                id="birthday-input"
                maxLength="30"
                ref={birthdayInput}
                required
                type="date"
              />
            </div>

            <div className="questionnaire-form-input">
              <h6>Location:</h6>
              <label htmlFor="city-input"></label>
              <input
                id="city-input"
                maxLength="30"
                placeholder="City"
                ref={cityInput}
                required
                type="text"
              />

              <select
                className="address-input"
                defaultValue=""
                ref={stateInput}
              >
                <option value="">Select State</option>
                <option value="Alabama">AL</option>
                <option value="Alaska">AK</option>
                <option value="Arizona">AZ</option>
                <option value="Arkansas">AR</option>
                <option value="California">CA</option>
                <option value="Colorado">CO</option>
                <option value="Connecticut">CT</option>
                <option value="Delaware">DE</option>
                <option value="Florida">FL</option>
                <option value="Georgia">GA</option>
                <option value="Hawaii">HI</option>
                <option value="Idaho">ID</option>
                <option value="Illinois">IL</option>
                <option value="Indiana">IN</option>
                <option value="Iowa">IA</option>
                <option value="Kansas">KS</option>
                <option value="Kentucky">KY</option>
                <option value="Louisiana">LA</option>
                <option value="Maine">ME</option>
                <option value="Maryland">MD</option>
                <option value="Massachusetts">MA</option>
                <option value="Michigan">MI</option>
                <option value="Minnesota">MN</option>
                <option value="Mississippi">MS</option>
                <option value="Missouri">MO</option>
                <option value="Montana">MT</option>
                <option value="Nebraska">NE</option>
                <option value="Nevada">NV</option>
                <option value="New Hampshire">NH</option>
                <option value="New Jersey">NJ</option>
                <option value="New Mexico">NM</option>
                <option value="New York">NY</option>
                <option value="North Carolina">NC</option>
                <option value="North Dakota">ND</option>
                <option value="Ohio">OH</option>
                <option value="Oklahoma">OK</option>
                <option value="Oregon">OR</option>
                <option value="Pennsylvania">PA</option>
                <option value="Rhode Island">RI</option>
                <option value="South Carolina">SC</option>
                <option value="South Dakota">SD</option>
                <option value="Tennessee">TN</option>
                <option value="Texas">TX</option>
                <option value="Utah">UT</option>
                <option value="Vermont">VT</option>
                <option value="Virginia">VA</option>
                <option value="Washington">WA</option>
                <option value="West Virginia">WV</option>
                <option value="Wisconsin">WI</option>
                <option value="Wyoming">WY</option>
              </select>
            </div>

            <div className="questionnaire-body-header">
              <h5 className="questionnaire-form-subtitle">Hobbies</h5>
            </div>

            <div className="questionnaire-form-input">
              <h6>Add your hobbies:</h6>
              <label htmlFor="hobbies-input"></label>
              <input
                id="hobbies-input"
                maxLength="30"
                placeholder=""
                ref={hobbyInput}
                type="text"
              />
              <button type="button" onClick={addHobby}>
                Add
              </button>
            </div>

            {hobbyTags && hobbyTags.length > 0 && (
              <div className="questionnaire-form-hobby">
                {hobbyTags.map((tag, index) => (
                  <span
                    className="tag"
                    key={index}
                    onClick={() => removeHobbyTag(index)}
                  >
                    &times;&nbsp;&nbsp;{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="questionnaire-form-footer">
            <button type="submit">Submit</button>
          </div>
        </div>
      </div>
    </form>
  );
}