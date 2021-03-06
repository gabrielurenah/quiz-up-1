import React from 'react';
import { Modal, Button } from 'antd';

const TOTAL_ROUND_STEPS = 2;

const MyModal = props => {
  const { onSubmit, saving, type, visible, steps = null, editing } = props;

  const SUBMIT_BTN = editing ? (
    <Button key="submit" type="primary" loading={saving} onClick={onSubmit}>
      Editar {type}
    </Button>
  ) : (
    <Button key="submit" type="primary" loading={saving} onClick={onSubmit}>
      Crear {type}
    </Button>
  );

  const FOOTER = steps
    ? [
        steps.current > 0 && (
          <Button
            key={2}
            style={{ margin: '0 8px' }}
            onClick={() => steps.prev()}>
            Anterior
          </Button>
        ),
        steps.current < TOTAL_ROUND_STEPS - 1 && (
          <Button key={0} type="primary" onClick={() => steps.next()}>
            Siguiente
          </Button>
        ),
        steps.current === TOTAL_ROUND_STEPS - 1 && SUBMIT_BTN,
      ]
    : [SUBMIT_BTN];

  return (
    <Modal
      centered
      onCancel={props.onCancel}
      title={props.title}
      visible={visible}
      footer={FOOTER}>
      <>{props.children}</>
    </Modal>
  );
};

export default MyModal;
