import { describe, expect, test } from 'bun:test';
import { assetUrl, hostedAssetUrl } from './asset-url';
import video from '../assets/clinic_agent_walkthrough.mp4.asset.json';
import poster from '../assets/clinic_agent_walkthrough_poster.jpg.asset.json';

describe('CDN-only clinic walkthrough on Plesk', () => {
  test('video keeps its hosted origin instead of a missing local file', () => {
    expect(hostedAssetUrl(video.url)).toBe(`https://ammarai-ecosystem-hub.lovable.app${video.url}`);
  });
  test('poster keeps its hosted origin', () => {
    expect(hostedAssetUrl(poster.url)).toBe(`https://ammarai-ecosystem-hub.lovable.app${poster.url}`);
  });
  test('existing bundled media stays local', () => {
    expect(assetUrl('/__l5e/assets-v1/example/recording.mp3')).toBe('/media/recording.mp3');
    expect(hostedAssetUrl('/media/recording.mp3')).toBe('/media/recording.mp3');
    expect(hostedAssetUrl('https://example.com/video.mp4')).toBe('https://example.com/video.mp4');
  });
});