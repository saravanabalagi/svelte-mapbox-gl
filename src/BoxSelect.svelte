<script>
  import mapboxgl from 'mapbox-gl';
  import { getContext, onDestroy } from 'svelte';
  import { mapKey } from './context.js';

  const mapContext = getContext(mapKey);
  const map = mapContext.getMap();
  const loadedStore = mapContext.getLoadedStore();

  let canvas, container;

  $: if ($loadedStore) {
    try {
      canvas = map._canvas;
      container = map._container;
      canvas.addEventListener('mousedown', onMouseDown, true);
    } catch (e) {
      console.error('could not add event listeners for box select', e);
    }
  }

  let startPos;
  let box;

  const mousePos = (e) => {
    var rect = canvas.getBoundingClientRect();
    return new mapboxgl.Point(
      e.clientX - rect.left - canvas.clientLeft,
      e.clientY - rect.top - canvas.clientTop
    );
  };

  const onMouseDown = (e) => {
    // Continue the rest of the function if the shiftkey is pressed.
    if (!(e.shiftKey && e.button === 0)) return;

    // Disable default drag zooming when the shift key is held down.
    map.dragPan.disable();

    // Call functions for the following events
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('keydown', onKeyDown);

    // Capture the first xy coordinates
    startPos = mousePos(e);
    map.fire('boxselectstart', { originalEvent: e });
  };

  const onMouseMove = (e) => {
    var p0 = startPos,
      p1 = mousePos(e);

    if (!box) {
      box = document.createElement('div');
      box.classList.add('mapboxgl-boxzoom');
      container.appendChild(box);
      container.classList.add('mapboxgl-crosshair');
    }

    var minX = Math.min(p0.x, p1.x),
      maxX = Math.max(p0.x, p1.x),
      minY = Math.min(p0.y, p1.y),
      maxY = Math.max(p0.y, p1.y);

    // Adjust width and xy position of the box element ongoing
    var pos = 'translate(' + minX + 'px,' + minY + 'px)';
    box.style.transform = pos;
    box.style.WebkitTransform = pos;

    box.style.width = maxX - minX + 'px';
    box.style.height = maxY - minY + 'px';
  };

  const onMouseUp = (e) => {
    finish();
    map.fire('boxselectend', { originalEvent: e });
  };

  const onKeyDown = (e) => {
    if (e.keyCode === 27) {
      finish();
      map.fire('boxselectcancel', { originalEvent: e });
    }
  };

  const finish = () => {
    if (!box) return;

    document.removeEventListener('mousemove', onMouseMove, false);
    document.removeEventListener('keydown', onKeyDown, false);
    document.removeEventListener('mouseup', onMouseUp, false);

    container.classList.remove('mapboxgl-crosshair');

    box.parentNode.removeChild(box);
    box = null;

    map.dragPan.enable();
  };

  onDestroy(() => {
    if (canvas) canvas.removeEventListener('mousedown', onMouseDown);
  });
  </script>
