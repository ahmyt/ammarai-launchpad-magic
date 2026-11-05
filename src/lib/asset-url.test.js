import { describe, expect, test } from 'bun:test';
import { assetUrl, hostedAssetUrl } from './asset-url';
import video from '../assets/clinic_agent_walkthrough.mp4.asset.json';
import poster from '../assets/clinic_agent_walkthrough_poster.jpg.asset.json';

describe('CDN-only clinic walkthrough on Plesk', () => {
  test('video keeps its hosted origin instead of a missing local file', () => {
    expect(hostedAssetUrl(video.url)).toBe(`/media/${video.url.split('/').pop()}`);
  });
  test('poster keeps its hosted origin', () => {
    expect(hostedAssetUrl(poster.url)).toBe(`/media/${poster.url.split('/').pop()}`);
  });
  test('existing bundled media stays local', () => {
    expect(assetUrl('/__l5e/assets-v1/example/recording.mp3')).toBe('/media/recording.mp3');
    expect(hostedAssetUrl('/media/recording.mp3')).toBe('/media/recording.mp3');
    expect(hostedAssetUrl('https://example.com/video.mp4')).toBe('https://example.com/video.mp4');
  });
});