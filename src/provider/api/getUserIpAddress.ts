import { GEOLOCATION_API, IPResponse } from "@constants/constants";
import axios from "axios";

export async function getUserIPAddress(): Promise<IPResponse> {
  try {
    const response = await axios.get(GEOLOCATION_API);
    return {
      success: true,
      ipAddress: response.data.IPv4,
    };
  } catch (e) {
    return {
      success: false,
      ipAddress: null,
    };
  }
}
