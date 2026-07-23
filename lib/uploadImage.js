import { IMGBB_KEY } from './constants';

// يرفع صورة على ImgBB (مجاني تمامًا وبدون كارت ائتمان) ويرجع رابطها
export async function uploadImageToImgBB(file) {
  if (!IMGBB_KEY) {
    return { ok: false, reason: 'no-key' };
  }
  try {
    const base64 = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

    const form = new FormData();
    form.append('image', base64);

    const resp = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_KEY}`, {
      method: 'POST',
      body: form,
    });
    const data = await resp.json();
    if (data.success) {
      return { ok: true, url: data.data.url };
    }
    return { ok: false, reason: 'api-error' };
  } catch (e) {
    console.error(e);
    return { ok: false, reason: 'exception' };
  }
}
